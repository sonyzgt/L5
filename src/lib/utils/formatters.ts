import { formatUnits, parseUnits } from "viem";

export function formatAddress(address?: string): string {
  if (!address) return "";
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export function formatTokenAmount(
  amount: bigint | undefined,
  decimals: number = 18,
  displayDecimals: number = 4
): string {
  if (amount === undefined) return "—";
  try {
    const formatted = formatUnits(amount, decimals);
    const parts = formatted.split(".");
    if (parts.length === 1) return parts[0];
    const integerPart = parts[0];
    const fractionalPart = parts[1].slice(0, displayDecimals);
    if (fractionalPart === "" || fractionalPart === "0000") return integerPart;
    return `${integerPart}.${fractionalPart}`;
  } catch {
    return "0.00";
  }
}

export function parseTokenAmount(amount: string, decimals: number = 18): bigint {
  if (!amount || isNaN(Number(amount)) || Number(amount) < 0) {
    return 0n;
  }
  try {
    return parseUnits(amount, decimals);
  } catch {
    return 0n;
  }
}

export function formatDuration(seconds: number): string {
  if (seconds <= 0) return "0 DAYS";
  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);

  if (days > 0) {
    return `${days} ${days === 1 ? "DAY" : "DAYS"}`;
  }
  if (hours > 0) {
    return `${hours} ${hours === 1 ? "HR" : "HRS"}`;
  }
  return `${Math.max(minutes, 1)} MIN`;
}

export function formatApy(apyPercent: number | undefined): string {
  if (apyPercent === undefined || isNaN(apyPercent) || apyPercent <= 0) {
    return "—%";
  }
  return `${apyPercent.toFixed(2)}%`;
}
