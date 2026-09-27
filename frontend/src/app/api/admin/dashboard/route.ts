import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/server/auth";
import { getDashboardMetrics } from "@/lib/server/db";

export async function GET(req: NextRequest) {
  const admin = await requireAdmin(req);
  if (!admin) return NextResponse.json({ detail: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const metrics = await getDashboardMetrics(
    searchParams.get("date_from") || undefined,
    searchParams.get("date_to") || undefined
  );
  return NextResponse.json(metrics);
}
