// pages/Game.jsx
import React, { useState, useEffect } from 'react';
import StartButton from '../components/StartButton';
import ResetButton from '../components/ResetButton';
import GameBoard from '../components/GameBoard';
import ScoreIndicator from '../components/ScoreIndicator';
import { fetchGameData } from '../utils/fetchData';

const Game = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [gameData, setGameData] = useState([]);
  const [score, setScore] = useState(0);

  const startGame = async () => {
    const data = await fetchGameData();
    setGameData(data);
    setGameStarted(true);
  };

  const resetGame = () => {
    setGameData([]);
    setScore(0);
    setGameStarted(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-200 to-blue-200 flex flex-col items-center justify-center">
      {!gameStarted ? (
        <StartButton onStart={startGame} />
      ) : (
        <>
          <ScoreIndicator score={score} />
          <GameBoard data={gameData} />
          <ResetButton onReset={resetGame} />
        </>
      )}
    </div>
  );
};

export default Game;
