import { useEffect, useState } from "react";

export function usePlayersStorage() {
  const [players, setPlayers] = useState<string[]>([]);

  // Carrega do localStorage apenas após montagem do client
  useEffect(() => {
    const saved = window.localStorage.getItem("clashdoscria_players");
    if (saved) {
      setPlayers(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(
      "clashdoscria_players",
      JSON.stringify(players)
    );
  }, [players]);

  return [players, setPlayers] as const;
}
