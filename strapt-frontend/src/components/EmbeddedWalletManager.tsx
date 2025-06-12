import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Wallet, Plus, CheckCircle, Loader2 } from 'lucide-react';
import { useCivicWallet } from '@/hooks/use-civic-wallet';

interface EmbeddedWalletManagerProps {
  className?: string;
}

const EmbeddedWalletManager: React.FC<EmbeddedWalletManagerProps> = ({ 
  className = '' 
}) => {
  const { 
    isAuthenticated,
    hasEmbeddedWallet,
    isCreatingWallet,
    createEmbeddedWallet,
    connectExistingWallet,
    address,
    isConnected
  } = useCivicWallet();

  // Don't show anything if user is not authenticated
  if (!isAuthenticated) {
    return null;
  }

  // If user has a wallet and is connected, show wallet info
  if (hasEmbeddedWallet && isConnected) {
    return (
      <Card className={`${className} border-green-200 dark:border-green-800`}>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-green-700 dark:text-green-300">
            <CheckCircle className="h-5 w-5" />
            Wallet Connected
          </CardTitle>
          <CardDescription>
            Your embedded wallet is ready to use
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="text-sm">
              <span className="font-medium">Address:</span>
              <div className="font-mono text-xs bg-muted p-2 rounded mt-1">
                {address}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  // If user has a wallet but not connected, show connect option
  if (hasEmbeddedWallet && !isConnected) {
    return (
      <Card className={`${className} border-blue-200 dark:border-blue-800`}>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-blue-700 dark:text-blue-300">
            <Wallet className="h-5 w-5" />
            Wallet Available
          </CardTitle>
          <CardDescription>
            Connect to your embedded wallet
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button 
            onClick={connectExistingWallet}
            className="w-full"
            variant="outline"
          >
            <Wallet className="h-4 w-4 mr-2" />
            Connect Wallet
          </Button>
        </CardContent>
      </Card>
    );
  }

  // If user doesn't have a wallet, show creation option
  return (
    <Card className={`${className} border-orange-200 dark:border-orange-800`}>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-orange-700 dark:text-orange-300">
          <Plus className="h-5 w-5" />
          Create Wallet
        </CardTitle>
        <CardDescription>
          Create your embedded Web3 wallet to start using DeFi features
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="text-sm text-muted-foreground">
            <ul className="space-y-1">
              <li>• No seed phrase to remember</li>
              <li>• Secured by your social login</li>
              <li>• Ready for Web3 transactions</li>
            </ul>
          </div>
          <Button 
            onClick={createEmbeddedWallet}
            disabled={isCreatingWallet}
            className="w-full"
          >
            {isCreatingWallet ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Creating Wallet...
              </>
            ) : (
              <>
                <Plus className="h-4 w-4 mr-2" />
                Create Wallet
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default EmbeddedWalletManager;
