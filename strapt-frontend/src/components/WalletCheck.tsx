import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useCivicWallet } from '@/hooks/use-civic-wallet';
// import { useXellarWallet } from '@/hooks/use-xellar-wallet'; // Backup - kept for reference
import LoadingScreen from './LoadingScreen';

const WalletCheck = () => {
  const { isConnected } = useCivicWallet();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);

  // Give more time for auto-connection to happen
  useEffect(() => {
    // Longer timeout to ensure wallet auto-connection completes
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Increased from 100ms to 2000ms

    return () => clearTimeout(timer);
  }, []);

  // Keep showing loading screen while connection is being established
  if (isLoading) {
    return <LoadingScreen />;
  }

  // Only redirect to home if definitely not connected after loading
  if (!isConnected) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  // If connected, render the protected content
  return <Outlet />;
};

export default WalletCheck;
