import React from "react";

type GameScreenProps = {
  currentPlayer: string;
  isLast: boolean;
  revealed: boolean;
  word: string;
  isImpostor: boolean;
  onReveal: () => void;
  onNext: () => void;
};

export function GameScreen({
  currentPlayer,
  isLast,
  revealed,
  word,
  isImpostor,
  onReveal,
  onNext,
}: GameScreenProps) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-200 to-indigo-300 dark:from-blue-900 dark:to-indigo-950">
      <main className="bg-white dark:bg-zinc-900 rounded-xl p-6 w-full max-w-md shadow-xl text-center">
        <h2 className="text-2xl font-bold mb-4">
          Passe o celular para {currentPlayer}
        </h2>
        {!revealed ? (
          <button
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-bold"
            onClick={onReveal}
          >
            Revelar palavra
          </button>
        ) : (
          <>
            <div className="text-3xl font-bold mt-4">{word}</div>
            {isImpostor && (
              <p className="text-red-500 mt-2 font-bold">Você é o IMPOSTOR!</p>
            )}
          </>
        )}
        <button
          className="mt-6 bg-green-500 text-white w-full py-3 rounded-lg font-bold"
          onClick={onNext}
          disabled={!revealed}
        >
          {isLast ? "Ver quem começa" : "Próximo"}
        </button>
      </main>
    </div>
  );
}

// Tela de quem começa
export function WhoStartsScreen({
  who,
  onRestart,
}: {
  who: string;
  onRestart: () => void;
}) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-200 to-indigo-300 dark:from-blue-900 dark:to-indigo-950">
      <main className="bg-white dark:bg-zinc-900 rounded-xl p-6 w-full max-w-md shadow-xl text-center">
        <h2 className="text-2xl font-bold mb-4">
          Jogador sorteado para começar
        </h2>
        <div className="text-3xl font-extrabold text-green-700 dark:text-green-300 border-2 border-green-400 dark:border-green-400 rounded-xl px-8 py-4 bg-green-100 dark:bg-zinc-800 shadow mb-4">
          {who}
        </div>
        <button
          className="bg-blue-600 text-white w-full py-3 rounded-lg font-bold mt-4"
          onClick={onRestart}
        >
          Reiniciar
        </button>
      </main>
    </div>
  );
}
