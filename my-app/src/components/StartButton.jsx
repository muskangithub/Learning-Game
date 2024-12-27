import React, { useState } from "react";

const StartButton = ({ onStart }) => {
  const [loading, setLoading] = useState(false);

  const handleStart = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onStart();
    }, 2000); // Simulate loading
  };

  return (
   <div className="h-screen bg-gradient-to-br from-yellow-300 to-pink-300 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-extrabold text-purple-700 mb-8 animate-pulse">
        Welcome to Shape Matcher!
      </h1>
      <button
        onClick={handleStart}
        className={`${
          loading ? 'animate-bounce' : 'hover:bg-green-500'
        } bg-green-400 text-white font-bold py-4 px-6 rounded-full transition-all`}
      >
        {loading ? 'Loading...' : 'Start Game'}
      </button>
    </div>
  );
};

export default StartButton;
