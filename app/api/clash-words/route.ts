import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const token = process.env.CLASH_ROYALE_API_TOKEN;
  if (!token) {
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
    return NextResponse.json(
      { error: "Erro ao buscar cartas" },
      { status: 500 }
    );
  }
  const data = await res.json();
  // Retorna apenas nomes das cartas
  const words = (data.items || []).map((item: any) => item.name);
  return NextResponse.json(words);
}
