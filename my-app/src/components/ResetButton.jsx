// components/ResetButton.jsx
import React from 'react';

const ResetButton = ({ onReset }) => (
  <button
    onClick={onReset}
    className="bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-red-600"
  >
    Reset Game
  </button>
);

export default ResetButton;
