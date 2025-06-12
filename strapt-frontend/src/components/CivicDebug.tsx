import React from 'react';
import { useUser } from '@civic/auth-web3/react';
import { useAccount } from 'wagmi';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const CivicDebug: React.FC = () => {
  const { user, isLoading, authStatus, error } = useUser();
  const { address: wagmiAddress, isConnected: wagmiConnected } = useAccount();

  // Only show in development
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <Card className="fixed bottom-4 right-4 w-80 z-50 bg-background/95 backdrop-blur">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm">Civic Auth Debug</CardTitle>
      </CardHeader>
      <CardContent className="text-xs space-y-2">
        <div>
          <strong>Auth Status:</strong> {authStatus}
        </div>
        <div>
          <strong>Is Loading:</strong> {isLoading ? 'Yes' : 'No'}
        </div>
        <div>
          <strong>User:</strong> {user ? 'Present' : 'None'}
        </div>
        {user && (
          <div className="space-y-1">
            <div><strong>User ID:</strong> {user.id}</div>
            <div><strong>Email:</strong> {user.email || 'N/A'}</div>
            <div><strong>Name:</strong> {user.name || 'N/A'}</div>
          </div>
        )}
        <div>
          <strong>Wagmi Connected:</strong> {wagmiConnected ? 'Yes' : 'No'}
        </div>
        <div>
          <strong>Wagmi Address:</strong> {wagmiAddress || 'None'}
        </div>
        {error && (
          <div className="text-red-500">
            <strong>Error:</strong> {error.message}
          </div>
        )}
        <div>
          <strong>Current Path:</strong> {window.location.pathname}
        </div>
      </CardContent>
    </Card>
  );
};

export default CivicDebug;
