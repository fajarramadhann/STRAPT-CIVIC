import { useUser } from '@civic/auth-web3/react';
import { userHasWallet } from '@civic/auth-web3';
import { useAutoConnect } from '@civic/auth-web3/wagmi';
import { useAccount, useConnect } from 'wagmi';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

export function useCivicWallet() {
  const userContext = useUser();
  const { user, isLoading, signIn, signOut, authStatus, error } = userContext;
  const { address: wagmiAddress, isConnected: isWagmiConnected } = useAccount();
  const { connectors, connect } = useConnect();
  const [isConnecting, setIsConnecting] = useState(false);
  const [isCreatingWallet, setIsCreatingWallet] = useState(false);

  // Use auto-connect to automatically connect the embedded wallet
  useAutoConnect();

  // Check if user is authenticated
  const isAuthenticated = !!user && authStatus === 'authenticated';

  // Check if user has an embedded wallet
  const hasEmbeddedWallet = userHasWallet(userContext);

  // User is fully connected when authenticated and has a connected wallet
  const isConnected = isAuthenticated && isWagmiConnected;

  // Get user's wallet address - prefer wagmi address if available (from embedded wallet)
  // Otherwise fall back to user ID for display purposes
  const address = wagmiAddress || user?.id;

  // Note: Auto-navigation is now handled by CivicProvider's onSignIn callback
  // This ensures immediate redirection after successful authentication

  // Handle authentication errors
  useEffect(() => {
    if (error) {
      console.error('Civic Auth error:', error);
      toast.error('Authentication failed. Please try again.');
    }
  }, [error]);

  // Function to create embedded wallet for new users
  const createEmbeddedWallet = async () => {
    if (!user) {
      console.error('Cannot create wallet: user not authenticated');
      return false;
    }

    // Check if user already has a wallet
    if (hasEmbeddedWallet) {
      console.log('User already has a wallet');
      return true;
    }

    try {
      setIsCreatingWallet(true);
      console.log('Creating embedded wallet for user...');

      // Type guard to check if createWallet is available
      if ('createWallet' in userContext && typeof userContext.createWallet === 'function') {
        await userContext.createWallet();

        // After wallet creation, connect to it
        await connectExistingWallet();

        toast.success('Wallet created successfully!');
        return true;
      } else {
        console.error('createWallet function not available');
        return false;
      }
    } catch (error) {
      console.error('Failed to create wallet:', error);
      toast.error('Failed to create wallet. Please try again.');
      return false;
    } finally {
      setIsCreatingWallet(false);
    }
  };

  // Function to connect to existing embedded wallet
  const connectExistingWallet = async () => {
    try {
      const civicConnector = connectors.find(c => c.id === 'civic');
      if (civicConnector) {
        connect({ connector: civicConnector });
        console.log('Connected to embedded wallet');
        return true;
      } else {
        console.error('Civic connector not found');
        return false;
      }
    } catch (error) {
      console.error('Failed to connect to embedded wallet:', error);
      return false;
    }
  };

  // Function to handle wallet connection (sign in + create/connect wallet)
  const connectWallet = async () => {
    try {
      setIsConnecting(true);
      console.log('Starting Civic Auth sign-in...');

      // First, sign in the user
      await signIn();

      // The useAutoConnect hook will handle wallet creation and connection automatically
      console.log('Civic Auth sign-in initiated');
      return true;
    } catch (error) {
      console.error('Failed to connect wallet:', error);
      toast.error('Failed to connect wallet. Please try again.');
      return false;
    } finally {
      setIsConnecting(false);
    }
  };

  // Function to disconnect wallet
  const disconnectWallet = async () => {
    try {
      console.log('Starting Civic Auth sign-out...');
      await signOut();

      // The onSignOut callback will handle navigation
      console.log('Civic Auth sign-out completed');
      return true;
    } catch (error) {
      console.error('Failed to disconnect wallet:', error);
      toast.error('Failed to disconnect wallet. Please try again.');
      return false;
    }
  };

  // Return the necessary wallet functions and state
  return {
    isConnected,
    isLoading: isLoading || isConnecting || isCreatingWallet,
    address,
    user,
    authStatus,
    connectWallet,
    disconnectWallet,
    createEmbeddedWallet,
    connectExistingWallet,
    hasEmbeddedWallet,
    isAuthenticated,
    isCreatingWallet,
    signIn,
    signOut,
    isConnecting,
  };
}
