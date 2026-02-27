import { NextResponse } from "next/server";
import { getHotel } from '@/lib/mockApi';

export async function GET(_: any, { params }: { params: Promise<{ id: string }> }): Promise<any> {
  try {
    const { id } = await params;
    return NextResponse.json(await getHotel(Number(id)));
  } catch (e: unknown) {
    if (e instanceof Error) {
      return NextResponse.json(
        { error: e.message },
        { status: 404 }
      );
    }
    return NextResponse.json({ error: "Unknown error" }, { status: 500 });
  }
}
