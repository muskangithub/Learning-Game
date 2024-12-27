// components/CompletionScreen.jsx
import React from 'react';

const CompletionScreen = ({ onRestart,score }) => {
  return (
    <div className="h-screen bg-gradient-to-br from-blue-300 to-green-300 flex flex-col items-center justify-center">
      <div className="text-5xl font-extrabold text-yellow-500 mb-6 animate-bounce">
        🎉 You Did It! 🎉
      </div>
      <div className="text-2xl font-semibold text-purple-700 mb-4">
        Amazing work! You matched {score} out of 10.
      </div>
      <button
        onClick={onRestart}
        className="bg-purple-500 text-white font-bold py-3 px-6 rounded-full hover:bg-purple-600 transition-all"
      >
        Play Again
      </button>
    </div>
  );
};

export default CompletionScreen;
