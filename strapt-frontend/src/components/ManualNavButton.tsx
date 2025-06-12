import React from 'react';
import { Button } from '@/components/ui/button';
import { useCivicWallet } from '@/hooks/use-civic-wallet';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const ManualNavButton: React.FC = () => {
  const { isConnected, user } = useCivicWallet();
  const navigate = useNavigate();

  // Only show in development and when user is authenticated but not on app pages
  if (process.env.NODE_ENV !== 'development' || !isConnected || !user) {
    return null;
  }

  // Don't show if already on app pages
  if (window.location.pathname.startsWith('/app')) {
    return null;
  }

  return (
    <div className="fixed top-4 right-4 z-50">
      <Button
        onClick={() => navigate('/app')}
        className="bg-green-600 hover:bg-green-700 text-white"
        size="sm"
      >
        <ArrowRight className="mr-2 h-4 w-4" />
        Go to App (Manual)
      </Button>
    </div>
  );
};

export default ManualNavButton;
