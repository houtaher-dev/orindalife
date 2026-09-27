import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/server/auth";
import { listOrders } from "@/lib/server/db";

export async function GET(req: NextRequest) {
  const admin = await requireAdmin(req);
  if (!admin) return NextResponse.json({ detail: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const result = await listOrders({
    page: Number(searchParams.get("page") || 1),
    per_page: Number(searchParams.get("per_page") || 20),
    status: searchParams.get("status") || undefined,
    search: searchParams.get("search") || undefined,
    date_from: searchParams.get("date_from") || undefined,
    date_to: searchParams.get("date_to") || undefined,
  });
  return NextResponse.json(result);
}
