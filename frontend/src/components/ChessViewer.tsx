// Em frontend/src/components/ChessViewer.tsx

// 1. Importar o 'useRef'
import React, { useState, useEffect, useRef } from 'react';
// 2. A SUA IMPORTAÇÃO (com chaves)
import { Chessboard } from 'react-chessboard';
import { Chess } from 'chess.js';

interface ChessViewerProps {
  pgn: string;
}

export function ChessViewer({ pgn }: ChessViewerProps) {
  
  // --- LÓGICA DO SEU EXEMPLO ---
  // 1. Usamos 'useRef' para guardar o motor de xadrez
  const game = useRef(new Chess());

  // 2. Usamos 'useState' para a posição (para forçar re-renderização)
  const [position, setPosition] = useState(game.current.fen());

  // --- NOSSA LÓGICA ADAPTADA ---
  // 3. Usamos 'useState' para o histórico e o índice (para os botões)
  const [history, setHistory] = useState<string[]>([]);
  const [currentMoveIndex, setCurrentMoveIndex] = useState(0);

  // Este useEffect roda sempre que a prop 'pgn' mudar
  useEffect(() => {
    // 1. Carregamos o PGN no nosso 'game' (do useRef)
    game.current.loadPgn(pgn);
    
    // 2. Guardamos o histórico de lances
    const gameHistory = game.current.history();
    setHistory(gameHistory);

    // 3. Resetamos o 'game' para o início
    game.current.reset();
    
    // 4. Atualizamos a posição visual para o início
    setPosition(game.current.fen());
    
    // 5. Resetamos o nosso índice
    setCurrentMoveIndex(0);

  }, [pgn]); // Dependência: pgn

  // Botão "Próximo"
  function handleNext() {
    // 1. Pegamos o próximo lance do NOSSO histórico
    const nextMove = history[currentMoveIndex];
    if (nextMove) {
      // 2. Aplicamos o lance no 'game' (do useRef)
      game.current.move(nextMove);
      // 3. Atualizamos o 'position' (do useState) para forçar a re-renderização
      setPosition(game.current.fen());
      // 4. Avançamos o nosso índice
      setCurrentMoveIndex(currentMoveIndex + 1);
    }
  }

  // Botão "Anterior"
  function handlePrevious() {
    // 1. Desfazemos o lance no 'game' (do useRef)
    game.current.undo();
    // 2. Atualizamos o 'position' (do useState) para forçar a re-renderização
    setPosition(game.current.fen());
    // 3. Voltamos o nosso índice
    setCurrentMoveIndex(Math.max(0, currentMoveIndex - 1));
  }
  
  // --- A PROP 'OPTIONS' (A SUA DESCOBERTA) ---
  const chessboardOptions = {
    position: position // Usamos o 'position' do nosso estado
  };

  return (
    <div style={{ width: '400px' }}>
      
      {/* Passamos as 'options'. Sem 'key'. */}
      <Chessboard options={chessboardOptions} />
      
      <div style={{ marginTop: '10px', display: 'flex', gap: '10px' }}>
        <button onClick={handlePrevious} disabled={currentMoveIndex === 0}>
          Anterior
        </button>
        <button onClick={handleNext} disabled={currentMoveIndex === history.length}>
          Próximo
        </button>
      </div>
    </div>
  );
}