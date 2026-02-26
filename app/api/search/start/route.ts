import { NextResponse } from "next/server";
import { startSearchPrices } from '@/lib/mockApi';

export async function POST(request: Request) {
  try {
    const { countryID } = await request.json();
    return NextResponse.json(startSearchPrices(countryID));
  } catch (e: any) {
    return NextResponse.json(
      { error: e.message },
      { status: 400 }
    );
  }
}
