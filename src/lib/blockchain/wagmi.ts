import { http, createConfig, injected } from "wagmi";
import { robinhoodChain, hardhatChain } from "./chains";

export const wagmiConfig = createConfig({
  chains: [robinhoodChain, hardhatChain],
  connectors: [
    injected({
      target: "metaMask",
    }),
    injected({
      target: "coinbaseWallet",
    }),
    injected(),
  ],
  transports: {
    [robinhoodChain.id]: http(robinhoodChain.rpcUrls.default.http[0]),
    [hardhatChain.id]: http("http://127.0.0.1:8545"),
  },
  ssr: true,
});
