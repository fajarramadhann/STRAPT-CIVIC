import React from 'react';
import { UserButton } from '@civic/auth-web3/react';
import { useCivicWallet } from '@/hooks/use-civic-wallet';

interface CivicWalletButtonProps {
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'default' | 'sm' | 'lg';
  className?: string;
  children?: React.ReactNode;
}

const CivicWalletButton: React.FC<CivicWalletButtonProps> = ({
  className = '',
}) => {
  const { isLoading } = useCivicWallet();

  if (isLoading) {
    return (
      <div className={`inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background bg-primary text-primary-foreground hover:bg-primary/90 h-10 py-2 px-4 ${className}`}>
        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
        Loading...
      </div>
    );
  }

  return (
    <div className={className}>
      <UserButton
        className="civic-user-button"
        style={{
          minWidth: '120px',
          height: '40px',
          borderRadius: '6px',
          backgroundColor: 'hsl(var(--primary))',
          color: 'hsl(var(--primary-foreground))',
          border: '1px solid hsl(var(--border))',
          fontSize: '14px',
          fontWeight: '500',
          fontFamily: 'inherit',
          cursor: 'pointer',
          transition: 'all 0.2s ease-in-out',
        }}
        dropdownButtonStyle={{
          backgroundColor: 'hsl(var(--background))',
          color: 'hsl(var(--foreground))',
          border: '1px solid hsl(var(--border))',
          borderRadius: '6px',
          fontSize: '14px',
          fontFamily: 'inherit',
          padding: '8px 12px',
        }}
      />
    </div>
  );
};

export default CivicWalletButton;
