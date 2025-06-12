import { useCivicWallet } from '@/hooks/use-civic-wallet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useNavigate } from 'react-router-dom';
import { LogOut, Copy, ExternalLink, Check, HelpCircle, User, Wallet } from 'lucide-react';
import { useState } from 'react';
import InfoTooltip from '@/components/InfoTooltip';

const CivicWalletProfile = () => {
  const {
    user,
    isConnected,
    disconnectWallet,
    address,
    hasEmbeddedWallet,
    createEmbeddedWallet,
    isCreatingWallet
  } = useCivicWallet();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const [addressCopied, setAddressCopied] = useState(false);

  if (!isConnected || !user) {
    return null;
  }

  // Get user display information
  const displayName = user.name || user.email || 'User';
  const userInitials = displayName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  const userEmail = user.email;
  const userId = user.id;

  const handleCopyUserId = async () => {
    if (userId) {
      try {
        await navigator.clipboard.writeText(userId);
        setCopied(true);
        toast.success('User ID copied to clipboard');
        setTimeout(() => setCopied(false), 2000);
      } catch (error) {
        toast.error('Failed to copy user ID');
      }
    }
  };

  const handleCopyAddress = async () => {
    if (address) {
      try {
        await navigator.clipboard.writeText(address);
        setAddressCopied(true);
        toast.success('Wallet address copied to clipboard');
        setTimeout(() => setAddressCopied(false), 2000);
      } catch (error) {
        toast.error('Failed to copy wallet address');
      }
    }
  };

  const handleCreateWallet = async () => {
    try {
      await createEmbeddedWallet();
    } catch (error) {
      console.error('Failed to create wallet:', error);
    }
  };

  const handleDisconnect = async () => {
    try {
      await disconnectWallet();
      toast.success('Wallet disconnected successfully');
    } catch (error) {
      toast.error('Failed to disconnect wallet');
    }
  };

  const handleViewProfile = () => {
    navigate('/app/profile');
  };

  return (
    <div className="flex items-center gap-2">
      <InfoTooltip
        content="Your Civic Auth profile and wallet information"
        className="h-4 w-4"
      />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 rounded-full p-0">
            <Avatar className="h-8 w-8">
              <AvatarImage src={user.picture || ""} alt={displayName} />
              <AvatarFallback className="bg-primary text-primary-foreground">
                {userInitials}
              </AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-64">
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">{displayName}</p>
              {userEmail && (
                <p className="text-xs leading-none text-muted-foreground">
                  {userEmail}
                </p>
              )}
              {userId && (
                <p className="text-xs leading-none text-muted-foreground font-mono">
                  ID: {userId.slice(0, 8)}...{userId.slice(-4)}
                </p>
              )}
              {hasEmbeddedWallet && address && (
                <p className="text-xs leading-none text-muted-foreground font-mono">
                  Wallet: {address.slice(0, 6)}...{address.slice(-4)}
                </p>
              )}
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          
          <DropdownMenuItem className="cursor-pointer" onClick={handleViewProfile}>
            <User className="mr-2 h-4 w-4" />
            <span>View Profile</span>
          </DropdownMenuItem>

          {!hasEmbeddedWallet && (
            <DropdownMenuItem className="cursor-pointer" onClick={handleCreateWallet} disabled={isCreatingWallet}>
              <Wallet className="mr-2 h-4 w-4" />
              <span>{isCreatingWallet ? 'Creating Wallet...' : 'Create Wallet'}</span>
            </DropdownMenuItem>
          )}

          {hasEmbeddedWallet && address && (
            <DropdownMenuItem className="cursor-pointer" onClick={handleCopyAddress}>
              {addressCopied ? (
                <Check className="mr-2 h-4 w-4 text-green-500" />
              ) : (
                <Copy className="mr-2 h-4 w-4" />
              )}
              <span>Copy Wallet Address</span>
            </DropdownMenuItem>
          )}

          {userId && (
            <DropdownMenuItem className="cursor-pointer" onClick={handleCopyUserId}>
              {copied ? (
                <Check className="mr-2 h-4 w-4 text-green-500" />
              ) : (
                <Copy className="mr-2 h-4 w-4" />
              )}
              <span>Copy User ID</span>
            </DropdownMenuItem>
          )}
          
          <DropdownMenuItem className="cursor-pointer" onClick={() => window.open('https://auth.civic.com', '_blank')}>
            <ExternalLink className="mr-2 h-4 w-4" />
            <span>Civic Dashboard</span>
          </DropdownMenuItem>
          
          <DropdownMenuSeparator />
          <DropdownMenuItem 
            className="cursor-pointer text-destructive focus:text-destructive" 
            onClick={handleDisconnect}
          >
            <LogOut className="mr-2 h-4 w-4" />
            <span>Sign Out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default CivicWalletProfile;
