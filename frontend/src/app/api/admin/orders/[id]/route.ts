import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/server/auth";
import { getOrderById } from "@/lib/server/db";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const admin = await requireAdmin(req);
  if (!admin) return NextResponse.json({ detail: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const order = await getOrderById(Number(id));
  if (!order) return NextResponse.json({ detail: "الطلب غير موجود" }, { status: 404 });
  return NextResponse.json(order);
}
