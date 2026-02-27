import { NextResponse } from "next/server";
import { getSearchPrices, startSearchPrices, stopSearchPrices } from '@/lib/mockApi';


export async function POST(request: Request) {
    try {
      const { countryID } = await request.json();
      return NextResponse.json(await startSearchPrices(countryID));
    } catch (e: any) {
      return NextResponse.json(
        { error: e.message },
        { status: e.code }
      );
    }
  }
  

export async function GET(request: Request): Promise<any> {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get("token");
    if (!token) {
      return NextResponse.json(
        { error: "Token is required" },
        { status: 400 }
      );
    }
    try {
      return NextResponse.json(await getSearchPrices(token));
    } catch (e: any) {
      return NextResponse.json(
        { error: e.message },
        { status: e.code }
      );
    }
}

export async function DELETE(request: Request): Promise<any> {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get("token");
    if (!token) {
      return NextResponse.json(
        { error: "Token is required" },
        { status: 400 }
      );
    }
    try {
        return NextResponse.json(await stopSearchPrices(token));
    } catch (e: any) {
        return NextResponse.json({ error: e.message }, { status: e.code });
    }
}
