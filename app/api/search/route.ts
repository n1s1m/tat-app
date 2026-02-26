import { NextResponse } from "next/server";
import { searchGeo } from '@/lib/mockApi';

export async function GET(request: Request): Promise<any> {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get('search');
  return NextResponse.json(await searchGeo(search));
}
