import { useEffect, useState } from "react";

export function usePlayersStorage() {
  const [players, setPlayers] = useState<string[]>(() => {
    if (typeof window !== "undefined") {
      const saved = window.localStorage.getItem("clashdoscria_players");
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(
        "clashdoscria_players",
        JSON.stringify(players)
      );
    }
  }, [players]);

  return [players, setPlayers] as const;
}
