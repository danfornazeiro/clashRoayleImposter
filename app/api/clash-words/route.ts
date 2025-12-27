import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const token = process.env.CLASH_ROYALE_API_TOKEN;
    if (!token) {
      console.error("[API] Token não configurado");
      return NextResponse.json(
        { error: "Token não configurado" },
        { status: 500 }
      );
    }
    // Busca cartas do Clash Royale
    const res = await fetch("https://api.clashroyale.com/v1/cards", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) {
      const errText = await res.text();
      console.error("[API] Erro ao buscar cartas:", res.status, errText);
      return NextResponse.json(
        {
          error: "Erro ao buscar cartas",
          status: res.status,
          details: errText,
        },
        { status: 500 }
      );
    }
    const data = await res.json();
    // Retorna apenas nomes das cartas
    const words = (data.items || []).map((item: any) => item.name);
    return NextResponse.json(words);
  } catch (err: any) {
    console.error("[API] Erro inesperado:", err);
    return NextResponse.json(
      { error: "Erro inesperado", details: err?.message || String(err) },
      { status: 500 }
    );
  }
}
