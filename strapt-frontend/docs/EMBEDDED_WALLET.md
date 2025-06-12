# Embedded Wallet Integration

This document explains how the Civic Auth embedded wallet feature has been integrated into the STRAPT Wallet application.

## Overview

The application now supports Civic Auth's embedded wallets, which provide users with:
- Non-custodial Web3 wallets without seed phrases
- Wallets secured by social login (Google, etc.)
- Automatic wallet creation and connection
- Support for Ethereum/EVM chains (Lisk Sepolia, Base Sepolia)

## Key Components

### 1. CivicProvider (`src/providers/CivicProvider.tsx`)
- Enhanced with `embeddedWallet()` connector
- Configured with supported chains (Lisk Sepolia, Base Sepolia)
- Includes `initialChain` and `chains` configuration

### 2. Enhanced Civic Wallet Hook (`src/hooks/use-civic-wallet.ts`)
- Added `useAutoConnect()` for automatic wallet connection
- Added `userHasWallet()` type guard for wallet detection
- New functions:
  - `createEmbeddedWallet()` - Creates a new embedded wallet
  - `connectExistingWallet()` - Connects to existing embedded wallet
  - `hasEmbeddedWallet` - Boolean indicating if user has a wallet
  - `isCreatingWallet` - Loading state for wallet creation

### 3. Wallet Status Component (`src/components/WalletStatus.tsx`)
- Shows current wallet status (connected, available, none)
- Provides action buttons for wallet creation/connection
- Displays wallet address when connected

### 4. Embedded Wallet Manager (`src/components/EmbeddedWalletManager.tsx`)
- Comprehensive wallet management interface
- Shows different states: connected, available, needs creation
- Includes wallet creation flow with loading states

### 5. Enhanced Wallet Profile (`src/components/CivicWalletProfile.tsx`)
- Added wallet address display in dropdown
- Added "Create Wallet" option for users without wallets
- Added "Copy Wallet Address" functionality

## User Flow

### New User Flow
1. User signs in with Civic Auth (Google, etc.)
2. `useAutoConnect()` detects no wallet exists
3. Wallet creation is automatically triggered
4. User gets a fully functional Web3 wallet

### Existing User Flow
1. User signs in with Civic Auth
2. `useAutoConnect()` detects existing wallet
3. Wallet is automatically connected
4. User can immediately use Web3 features

### Manual Wallet Management
Users can also manually:
- Create wallets using the "Create Wallet" button
- Connect to existing wallets using the "Connect Wallet" button
- View wallet status in the WalletStatus component

## Technical Details

### Wagmi Integration
```typescript
// Embedded wallet connector is added to wagmi config
const config = createConfig({
  chains: [liskSepolia, baseSepolia],
  connectors: [
    embeddedWallet(), // Civic embedded wallet connector
  ],
  // ...
});
```

### Auto-Connect Hook
```typescript
// Automatically connects wallet when user is authenticated
useAutoConnect(); // This hook handles wallet creation + connection
```

### Wallet Detection
```typescript
const { hasEmbeddedWallet, isConnected } = useCivicWallet();

if (hasEmbeddedWallet && isConnected) {
  // User has wallet and is connected
} else if (hasEmbeddedWallet && !isConnected) {
  // User has wallet but needs to connect
} else {
  // User needs to create a wallet
}
```

## Security Features

- **Non-custodial**: Neither Civic nor the app has access to private keys
- **Social Recovery**: Wallets are linked to user's social login
- **EOA Wallets**: Standard Ethereum externally owned accounts
- **Recovery Support**: Built-in recovery features from wallet provider

## Supported Chains

Currently configured for:
- **Lisk Sepolia** (Primary testnet)
- **Base Sepolia** (Secondary testnet)

Additional chains can be added by updating the `CivicProvider` configuration.

## Usage Examples

### Check Wallet Status
```typescript
const { hasEmbeddedWallet, isConnected, address } = useCivicWallet();
```

### Create Wallet
```typescript
const { createEmbeddedWallet, isCreatingWallet } = useCivicWallet();

const handleCreateWallet = async () => {
  await createEmbeddedWallet();
};
```

### Connect Existing Wallet
```typescript
const { connectExistingWallet } = useCivicWallet();

const handleConnect = async () => {
  await connectExistingWallet();
};
```

## Components Usage

### Add Wallet Status to Any Page
```typescript
import WalletStatus from '@/components/WalletStatus';

// In your component
<WalletStatus className="mb-4" />
```

### Add Full Wallet Manager
```typescript
import EmbeddedWalletManager from '@/components/EmbeddedWalletManager';

// In your component
<EmbeddedWalletManager className="max-w-md" />
```

## Migration Notes

All existing Xellar wallet references have been replaced with Civic Auth:
- `useXellarWallet` → `useCivicWallet`
- `XellarProvider` → `CivicProvider`
- `XellarWalletProfile` → `CivicWalletProfile`

The application now fully uses Civic Auth's embedded wallet system for all Web3 functionality.
