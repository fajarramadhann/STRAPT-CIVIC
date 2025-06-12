import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Wallet, CheckCircle, AlertCircle, Plus, Loader2 } from 'lucide-react';
import { useCivicWallet } from '@/hooks/use-civic-wallet';

interface WalletStatusProps {
  className?: string;
}

const WalletStatus: React.FC<WalletStatusProps> = ({ className = '' }) => {
  const { 
    isAuthenticated,
    hasEmbeddedWallet,
    isConnected,
    address,
    createEmbeddedWallet,
    connectExistingWallet,
    isCreatingWallet
  } = useCivicWallet();

  if (!isAuthenticated) {
    return null;
  }

  const getStatusInfo = () => {
    if (hasEmbeddedWallet && isConnected) {
      return {
        icon: CheckCircle,
        title: 'Wallet Connected',
        description: 'Your embedded wallet is ready for Web3 transactions',
        status: 'connected',
        color: 'text-green-600 dark:text-green-400',
        bgColor: 'bg-green-50 dark:bg-green-950',
        borderColor: 'border-green-200 dark:border-green-800'
      };
    }
    
    if (hasEmbeddedWallet && !isConnected) {
      return {
        icon: AlertCircle,
        title: 'Wallet Available',
        description: 'Connect to your embedded wallet to start using Web3 features',
        status: 'available',
        color: 'text-blue-600 dark:text-blue-400',
        bgColor: 'bg-blue-50 dark:bg-blue-950',
        borderColor: 'border-blue-200 dark:border-blue-800'
      };
    }
    
    return {
      icon: Wallet,
      title: 'No Wallet',
      description: 'Create an embedded wallet to access Web3 features',
      status: 'none',
      color: 'text-orange-600 dark:text-orange-400',
      bgColor: 'bg-orange-50 dark:bg-orange-950',
      borderColor: 'border-orange-200 dark:border-orange-800'
    };
  };

  const statusInfo = getStatusInfo();
  const StatusIcon = statusInfo.icon;

  const handleAction = () => {
    if (statusInfo.status === 'available') {
      connectExistingWallet();
    } else if (statusInfo.status === 'none') {
      createEmbeddedWallet();
    }
  };

  const getActionButton = () => {
    if (statusInfo.status === 'connected') {
      return (
        <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
          <CheckCircle className="h-3 w-3 mr-1" />
          Connected
        </Badge>
      );
    }
    
    if (statusInfo.status === 'available') {
      return (
        <Button size="sm" variant="outline" onClick={handleAction}>
          <Wallet className="h-4 w-4 mr-2" />
          Connect
        </Button>
      );
    }
    
    return (
      <Button 
        size="sm" 
        onClick={handleAction}
        disabled={isCreatingWallet}
      >
        {isCreatingWallet ? (
          <>
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            Creating...
          </>
        ) : (
          <>
            <Plus className="h-4 w-4 mr-2" />
            Create Wallet
          </>
        )}
      </Button>
    );
  };

  return (
    <Card className={`${className} ${statusInfo.borderColor}`}>
      <CardHeader className={`pb-3 ${statusInfo.bgColor}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <StatusIcon className={`h-5 w-5 ${statusInfo.color}`} />
            <CardTitle className={`text-sm ${statusInfo.color}`}>
              {statusInfo.title}
            </CardTitle>
          </div>
          {getActionButton()}
        </div>
        <CardDescription className="text-xs">
          {statusInfo.description}
        </CardDescription>
      </CardHeader>
      
      {statusInfo.status === 'connected' && address && (
        <CardContent className="pt-3">
          <div className="text-xs">
            <span className="font-medium text-muted-foreground">Address:</span>
            <div className="font-mono text-xs bg-muted p-2 rounded mt-1 break-all">
              {address}
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  );
};

export default WalletStatus;
