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

  // Position history snapshot
  const position = {
    address: address.toLowerCase(),
    stakeAsset: "USDG",
    rewardAsset: "KAWA",
    usdStaked: "0",
    stakedAmount: "0",
    kawaRewards: "0",
    rewardsClaimed: "0",
    durationSeconds: 0,
    state: "dormant",
    lastUpdated: new Date().toISOString(),
  };

  return NextResponse.json({ position });
}
