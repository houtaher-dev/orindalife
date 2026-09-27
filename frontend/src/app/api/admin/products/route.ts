import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/server/auth";
import { createProduct, listProducts } from "@/lib/server/db";

export async function GET(req: NextRequest) {
  const admin = await requireAdmin(req);
  if (!admin) return NextResponse.json({ detail: "Unauthorized" }, { status: 401 });
  return NextResponse.json(await listProducts());
}

export async function POST(req: NextRequest) {
  const admin = await requireAdmin(req);
  if (!admin) return NextResponse.json({ detail: "Unauthorized" }, { status: 401 });
  const body = await req.json();
  const product = await createProduct(body);
  return NextResponse.json(product, { status: 201 });
}
