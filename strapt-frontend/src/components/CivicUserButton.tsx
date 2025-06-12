import React from 'react';
import { UserButton } from '@civic/auth-web3/react';

interface CivicUserButtonProps {
  className?: string;
}

const CivicUserButton: React.FC<CivicUserButtonProps> = ({ 
  className = '',
}) => {
  return (
    <UserButton 
      className={className}
      style={{ 
        minWidth: '120px',
        height: '40px',
        borderRadius: '8px',
        backgroundColor: 'hsl(var(--primary))',
        color: 'hsl(var(--primary-foreground))',
        border: '1px solid hsl(var(--border))',
        fontSize: '14px',
        fontWeight: '500',
      }}
      dropdownButtonStyle={{
        backgroundColor: 'hsl(var(--background))',
        color: 'hsl(var(--foreground))',
        border: '1px solid hsl(var(--border))',
        borderRadius: '6px',
      }}
    />
  );
};

export default CivicUserButton;
