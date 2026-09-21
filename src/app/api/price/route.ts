import { NextResponse } from "next/server";

export async function GET() {
  const priceApiUrl = process.env.PRICE_API_URL;
  const priceApiKey = process.env.PRICE_API_KEY;

  if (!priceApiUrl) {
    return NextResponse.json({
      priceUsd: null,
      available: false,
      message: "Price feed not configured. Displaying $— per protocol specification.",
    });
  }

  try {
    const res = await fetch(priceApiUrl, {
      headers: priceApiKey ? { Authorization: `Bearer ${priceApiKey}` } : {},
      next: { revalidate: 60 },
    });
    const data = await res.json();
    return NextResponse.json({
      priceUsd: data.price || null,
      available: true,
      timestamp: new Date().toISOString(),
    });
  } catch {
    return NextResponse.json({
      priceUsd: null,
      available: false,
      message: "Price index service currently unavailable.",
    });
  }
}
