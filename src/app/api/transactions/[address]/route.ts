import { NextRequest, NextResponse } from "next/server";
import { isAddress } from "viem";

export async function GET(
  request: NextRequest,
  { params }: { params: { address: string } }
) {
  const { address } = params;

  if (!isAddress(address)) {
    return NextResponse.json({ error: "Invalid EVM address" }, { status: 400 });
  }

  // Transaction history array
  const transactions: Array<{
    id: string;
    type: "STAKE_USDG" | "UNSTAKE_USDG" | "CLAIM_L5" | "CLAIM_KAWA";
    asset: "USDG" | "L5" | "KAWA";
    amount: string;
    hash: string;
    timestamp: string;
  }> = [];

  return NextResponse.json({
    address: address.toLowerCase(),
    transactions,
  });
}
