import { NextResponse } from "next/server";
import { getCountries } from '@/lib/mockApi';

export async function GET() {
  return NextResponse.json(await getCountries());
}
