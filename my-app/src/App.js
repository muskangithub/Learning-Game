import React, { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import CompletionScreen from "./components/CompletionScreen";
import StartButton from "./components/StartButton";
import GameNew from "./components/GameNew";

function App() {
  const [screen, setScreen] = useState("landing");
  const [score, setScore] = useState(0);

  const startGame = () => setScreen("game");
  const completeGame = () => setScreen("completion");
  const restartGame = () => {
    setScreen("landing");
    setScore(0);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      {screen === "landing" && <StartButton onStart={startGame} />}
      {screen === "game" && (
        <GameNew onComplete={completeGame} score={score} setScore={setScore} />
      )}
      {screen === "completion" && (
        <CompletionScreen onRestart={restartGame} score={score} />
      )}
    </DndProvider>
  );
}

export default App;
