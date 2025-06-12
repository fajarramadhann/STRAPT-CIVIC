import React, { useEffect, useState } from 'react';
import { useCivicWallet } from '@/hooks/use-civic-wallet';
import CivicAuthLoading from './CivicAuthLoading';

const CivicAuthModal: React.FC = () => {
  const { isConnecting, authStatus } = useCivicWallet();
  const [showLoading, setShowLoading] = useState(false);

  useEffect(() => {
    if (isConnecting || authStatus === 'loading') {
      setShowLoading(true);
    } else {
      // Add a small delay before hiding to prevent flashing
      const timer = setTimeout(() => {
        setShowLoading(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isConnecting, authStatus]);

  if (!showLoading) {
    return null;
  }

  return (
    <CivicAuthLoading 
      message={
        authStatus === 'loading' 
          ? "Setting up your wallet..." 
          : "Connecting to Civic Auth..."
      } 
    />
  );
};

export default CivicAuthModal;
