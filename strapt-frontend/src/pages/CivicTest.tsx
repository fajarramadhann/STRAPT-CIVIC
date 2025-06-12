import React from 'react';
import { UserButton } from '@civic/auth-web3/react';
import { useCivicWallet } from '@/hooks/use-civic-wallet';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const CivicTest: React.FC = () => {
  const { user, isConnected, address, authStatus, isLoading } = useCivicWallet();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-2xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Civic Auth Test Page</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Civic UserButton</h3>
              <UserButton 
                style={{ 
                  minWidth: '150px',
                  height: '40px',
                  borderRadius: '8px',
                }}
              />
            </div>

            <div className="space-y-2">
              <h3 className="font-semibold">Authentication Status</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <strong>Auth Status:</strong> {authStatus}
                </div>
                <div>
                  <strong>Is Connected:</strong> {isConnected ? 'Yes' : 'No'}
                </div>
                <div>
                  <strong>Is Loading:</strong> {isLoading ? 'Yes' : 'No'}
                </div>
                <div>
                  <strong>Has User:</strong> {user ? 'Yes' : 'No'}
                </div>
              </div>
            </div>

            {user && (
              <div className="space-y-2">
                <h3 className="font-semibold">User Information</h3>
                <div className="text-sm space-y-1">
                  <div><strong>ID:</strong> {user.id}</div>
                  <div><strong>Email:</strong> {user.email || 'N/A'}</div>
                  <div><strong>Name:</strong> {user.name || 'N/A'}</div>
                  <div><strong>Picture:</strong> {user.picture ? 'Yes' : 'No'}</div>
                </div>
              </div>
            )}

            <div className="space-y-2">
              <h3 className="font-semibold">Wallet Information</h3>
              <div className="text-sm">
                <div><strong>Address:</strong> {address || 'None'}</div>
              </div>
            </div>

            <div className="flex gap-4">
              <Button 
                onClick={() => navigate('/app')}
                disabled={!isConnected}
              >
                Go to App
              </Button>
              <Button 
                variant="outline"
                onClick={() => navigate('/')}
              >
                Back to Landing
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CivicTest;
