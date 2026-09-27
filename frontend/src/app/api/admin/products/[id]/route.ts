import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/server/auth";
import { deleteProduct, updateProduct } from "@/lib/server/db";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const admin = await requireAdmin(req);
  if (!admin) return NextResponse.json({ detail: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const body = await req.json();
  const product = await updateProduct(Number(id), body);
  if (!product) return NextResponse.json({ detail: "المنتج غير موجود" }, { status: 404 });
  return NextResponse.json(product);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const admin = await requireAdmin(req);
  if (!admin) return NextResponse.json({ detail: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const ok = await deleteProduct(Number(id));
  if (!ok) return NextResponse.json({ detail: "المنتج غير موجود" }, { status: 404 });
  return NextResponse.json({ status: "ok" });
}
