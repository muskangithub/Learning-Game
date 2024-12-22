// components/ScoreIndicator.jsx
import React from 'react';

const ScoreIndicator = ({ score }) => (
  <div className="text-center text-xl font-bold text-green-500">
    Score: {score}
  </div>
);

export default ScoreIndicator;
