// App.jsx
import React, { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import CompletionScreen from "./components/CompletionScreen";
import StartButton from "./components/StartButton";
import GameInterface from "./components/GameBoard";

function App() {
  const [screen, setScreen] = useState("landing");

  const startGame = () => setScreen("game");
  const completeGame = () => setScreen("completion");
  const restartGame = () => setScreen("landing");

  return (
    <DndProvider backend={HTML5Backend}>
      {screen === "landing" && <StartButton onStart={startGame} />}
      {screen === "game" && <GameInterface onComplete={completeGame} />}
      {screen === "completion" && <CompletionScreen onRestart={restartGame} />}
    </DndProvider>
  );
}

export default App;
