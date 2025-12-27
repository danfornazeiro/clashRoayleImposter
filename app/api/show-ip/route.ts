import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  // Retorna o IP público do request para ajudar a cadastrar no painel da Supercell
  const ip =
    req.headers.get("x-forwarded-for") ||
    req.headers.get("x-real-ip") ||
    "(não detectado)";
  return NextResponse.json({ ip });
}
