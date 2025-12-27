"use client";
import { useState } from "react";
import { clashRoyaleCardsPT } from "./utils/clashRoyaleCardsPT";
import { usePlayersStorage } from "./hooks/usePlayersStorage";
import { GameScreen, WhoStartsScreen } from "./components/GameScreens";

type GameData = {
  secretWord: string;
  impostor: string;
  words: Record<string, string>;
};

export default function Home() {
  const [playerName, setPlayerName] = useState("");
  const [players, setPlayers] = usePlayersStorage();
  const [loading, setLoading] = useState(false);

  const [gameData, setGameData] = useState<GameData | null>(null);
  const [revealIndex, setRevealIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [whoStarts, setWhoStarts] = useState<string | null>(null);

  // ======================
  // Game Logic
  // ======================
  const startGame = () => {
    setLoading(true);
    const secretWord =
      clashRoyaleCardsPT[Math.floor(Math.random() * clashRoyaleCardsPT.length)];
    const impostor = players[Math.floor(Math.random() * players.length)];
    const result: Record<string, string> = {};
    players.forEach((p) => {
      result[p] = p === impostor ? "???" : secretWord;
    });
    setGameData({ secretWord, impostor, words: result });
    setRevealIndex(0);
    setRevealed(false);
    setWhoStarts(null);
    setLoading(false);
  };

  const nextReveal = () => {
    if (revealIndex === players.length - 1) {
      const sorteado = players[Math.floor(Math.random() * players.length)];
      setWhoStarts(sorteado);
    } else {
      setRevealIndex((prev) => prev + 1);
      setRevealed(false);
    }
  };

  const resetGame = () => {
    setGameData(null);
    setRevealIndex(0);
    setRevealed(false);
    setWhoStarts(null);
  };

  // ======================
  // UI — GAME SCREEN
  // ======================
  if (gameData) {
    if (whoStarts) {
      return <WhoStartsScreen who={whoStarts} onRestart={resetGame} />;
    }
    const currentPlayer = players[revealIndex];
    const isLast = revealIndex === players.length - 1;
    return (
      <GameScreen
        currentPlayer={currentPlayer}
        isLast={isLast}
        revealed={revealed}
        word={gameData.words[currentPlayer]}
        isImpostor={gameData.words[currentPlayer] === "???"}
        onReveal={() => setRevealed(true)}
        onNext={nextReveal}
      />
    );
  }

  // ======================
  // UI — START SCREEN
  // ======================
  return (
    <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-blue-200 to-indigo-300 dark:from-blue-900 dark:to-indigo-950">
      <main className="bg-white dark:bg-zinc-900 rounded-xl p-6 w-full max-w-md shadow-xl">
        <h1 className="text-3xl font-bold text-center mb-4">Clash dos Cria</h1>

        <input
          className="w-full p-3 rounded-lg border mb-2"
          placeholder="Nome do jogador"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
          onKeyDown={(e) =>
            e.key === "Enter" &&
            playerName.trim() &&
            setPlayers([...players, playerName.trim()])
          }
        />

        <button
          className="bg-blue-600 text-white w-full py-2 rounded-lg mb-4"
          onClick={() => {
            if (playerName.trim()) {
              setPlayers([...players, playerName.trim()]);
              setPlayerName("");
            }
          }}
        >
          Adicionar
        </button>

        <ul className="mb-4">
          {players.map((p) => (
            <li key={p} className="flex justify-between">
              {p}
              <button
                onClick={() => setPlayers(players.filter((x) => x !== p))}
              >
                ❌
              </button>
            </li>
          ))}
        </ul>

        <button
          className="bg-yellow-400 w-full py-3 rounded-lg font-bold"
          disabled={players.length < 3 || loading}
          onClick={startGame}
        >
          {loading ? "Sorteando..." : "Iniciar Jogo"}
        </button>
      </main>
    </div>
  );
}
