// Utilitário para buscar cartas do Clash Royale
export async function getClashRoyaleWords() {
  const res = await fetch("/api/clash-words");
  if (!res.ok) throw new Error("Erro ao buscar palavras do Clash Royale");
  return res.json();
}
