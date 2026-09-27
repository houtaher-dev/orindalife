import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/server/auth";
import { getSiteSettings, updateSiteSettings } from "@/lib/server/db";

export async function GET(req: NextRequest) {
  const admin = await requireAdmin(req);
  if (!admin) return NextResponse.json({ detail: "Unauthorized" }, { status: 401 });
  return NextResponse.json(await getSiteSettings());
}

export async function PATCH(req: NextRequest) {
  const admin = await requireAdmin(req);
  if (!admin) return NextResponse.json({ detail: "Unauthorized" }, { status: 401 });
  const body = await req.json();
  return NextResponse.json(await updateSiteSettings(body));
}
