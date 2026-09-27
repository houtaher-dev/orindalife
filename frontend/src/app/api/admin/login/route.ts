import { NextRequest, NextResponse } from "next/server";
import { signAdminToken, validateCredentials } from "@/lib/server/auth";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const username = String(body.username || "");
    const password = String(body.password || "");

    if (!validateCredentials(username, password)) {
      return NextResponse.json({ detail: "اسم المستخدم أو كلمة المرور غير صحيحة" }, { status: 401 });
    }

    const access_token = await signAdminToken(username);
    return NextResponse.json({ access_token, token_type: "bearer" });
  } catch {
    return NextResponse.json({ detail: "خطأ في تسجيل الدخول" }, { status: 500 });
  }
}
