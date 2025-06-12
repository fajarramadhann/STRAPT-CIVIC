import React from "react";
import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CivicAuthProvider } from "@civic/auth-web3/react";
import { embeddedWallet } from "@civic/auth-web3/wagmi";
import { liskSepolia, baseSepolia } from "viem/chains";
import { config } from "./wagmiConfig";

// Civic Auth Client ID - You'll need to get this from auth.civic.com
// To get your client ID:
// 1. Go to https://auth.civic.com
// 2. Sign up or log in
// 3. Create a new application
// 4. Select "Web3 wallet" option for embedded wallets
// 5. Copy your client ID and replace the placeholder below
const CIVIC_CLIENT_ID = "f37809ea-173e-4550-a7f5-e9137011c022";

const queryClient = new QueryClient();

export const CivicProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <WagmiProvider config={config}>
        <CivicAuthProvider
          clientId={CIVIC_CLIENT_ID}
          displayMode="redirect"
          chains={[liskSepolia, baseSepolia]}
          initialChain={liskSepolia}
          onSignIn={(error?: Error) => {
            if (error) {
              console.error("Civic Auth sign-in error:", error);
            } else {
              console.log("Civic Auth sign-in successful");
            }
          }}
          onSignOut={async () => {
            console.log("Civic Auth sign-out successful");
          }}
        >
          {children}
        </CivicAuthProvider>
      </WagmiProvider>
    </QueryClientProvider>
  );
};
