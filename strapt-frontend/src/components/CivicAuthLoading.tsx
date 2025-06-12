import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2, Shield, Wallet } from 'lucide-react';

interface CivicAuthLoadingProps {
  message?: string;
}

const CivicAuthLoading: React.FC<CivicAuthLoadingProps> = ({ 
  message = "Connecting to Civic Auth..." 
}) => {
  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardContent className="p-8 text-center space-y-6">
          <div className="flex justify-center">
            <div className="relative">
              <Shield className="h-12 w-12 text-primary" />
              <Loader2 className="h-6 w-6 text-primary animate-spin absolute -top-1 -right-1" />
            </div>
          </div>
          
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Secure Authentication</h3>
            <p className="text-sm text-muted-foreground">
              {message}
            </p>
          </div>

          <div className="flex items-center justify-center space-x-4 text-xs text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Shield className="h-3 w-3" />
              <span>Secure</span>
            </div>
            <div className="flex items-center space-x-1">
              <Wallet className="h-3 w-3" />
              <span>Web3 Ready</span>
            </div>
          </div>

          <div className="text-xs text-muted-foreground">
            Powered by Civic Auth
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CivicAuthLoading;
