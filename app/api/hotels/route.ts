import { NextResponse } from "next/server";
import { getHotels } from '@/lib/mockApi';

export async function GET(request: { url: string | URL; }) {
  const { searchParams } = new URL(request.url);
  const countryID = searchParams.get("countryID");

  return NextResponse.json(await getHotels(countryID));
}
