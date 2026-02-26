import { NextResponse } from "next/server";
import { api, getSearchPrices, stopSearchPrices } from '@/lib/mockApi';

export async function GET(_: any, { params }: { params: Promise<{ token: string }> }): Promise<any> {
  try {
    const { token } = await params;
    return NextResponse.json(getSearchPrices(token));
  } catch (e: any) {
    return NextResponse.json(
      { error: e.message },
      { status: 404 }
    );
  }
}

export async function DELETE(_: any, { params }: { params: Promise<{ token: string }> }): Promise<any> {
  try {
    const { token } = await params;
    return NextResponse.json(stopSearchPrices(token));
  } catch (e: any) {
    return NextResponse.json(
      { error: e.message },
      { status: 404 }
    );
  }
}
