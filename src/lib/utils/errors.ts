export interface HumanReadableError {
  title: string;
  description: string;
}

export function parseWeb3Error(error: unknown): HumanReadableError {
  if (!error) {
    return {
      title: "Unknown Error",
      description: "An unexpected error occurred. Please try again.",
    };
  }

  const message = error instanceof Error ? error.message.toLowerCase() : String(error).toLowerCase();

  // User rejection
  if (
    message.includes("user rejected") ||
    message.includes("user denied") ||
    message.includes("action rejected") ||
    message.includes("rejected the request")
  ) {
    return {
      title: "Transaction Cancelled",
      description: "You declined the request in your wallet. No assets were staked or transferred.",
    };
  }

  // Insufficient funds / gas
  if (
    message.includes("insufficient funds") ||
    message.includes("exceeds balance") ||
    message.includes("insufficient balance")
  ) {
    return {
      title: "Insufficient Balance",
      description: "Your wallet does not have enough tokens or gas to complete this transaction.",
    };
  }

  // Insufficient allowance
  if (message.includes("allowance") || message.includes("erc20: transfer amount exceeds allowance")) {
    return {
      title: "Approval Required",
      description: "The protocol needs permission to access your staking tokens. Please approve first.",
    };
  }

  // Wrong Network
  if (message.includes("chain mismatch") || message.includes("wrong network") || message.includes("unsupported chain")) {
    return {
      title: "Wrong Network",
      description: "Please switch your wallet network to Robinhood Chain.",
    };
  }

  // Contract reverts
  if (message.includes("cannot stake 0")) {
    return {
      title: "Invalid Amount",
      description: "Staking amount must be greater than zero.",
    };
  }

  if (message.includes("insufficient staked balance") || message.includes("cannot unstake 0")) {
    return {
      title: "Unstake Error",
      description: "You cannot unstake more than your current staked balance.",
    };
  }

  // RPC / Timeout
  if (message.includes("timeout") || message.includes("timed out") || message.includes("network error")) {
    return {
      title: "Network Timeout",
      description: "Robinhood Chain RPC took too long to respond. Check your connection and try again.",
    };
  }

  // Fallback
  return {
    title: "Transaction Failed",
    description: "The transaction could not be completed on Robinhood Chain. Please try again.",
  };
}
