import { Config, createConfig, http } from "wagmi";
import { liskSepolia, baseSepolia } from "viem/chains";
import { embeddedWallet } from "@civic/auth-web3/wagmi";

export const config = createConfig({
  chains: [liskSepolia],
  transports: {
    [liskSepolia.id]: http()
  },
  connectors: [
    embeddedWallet(),
  ],
}) as Config;