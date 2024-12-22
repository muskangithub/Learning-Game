// components/GameInterface.jsx
import React, { useState } from 'react';
import DragItem from './DragItem';
import DropZone from './DropZone';
import Lion from '../assets/images/Lion.jpg'
import Panda from '../assets/images/panda.jpg'
import Parrot from '../assets/images/parrot.jpeg'
import Fish from '../assets/images/fish.jpg'
import Camel from '../assets/images/camel.jpeg'

const GameInterface = ({ onComplete }) => {
const zones = [
  { id: '1', accept: 'circle', imageUrl: 'https://via.placeholder.com/100?text=Circle' },
  { id: '2', accept: 'square', imageUrl: 'https://via.placeholder.com/100?text=Square' },
];


  const items = [
    { id: '2', type: 'panda', imageUrl: Panda },
    { id: '1', type: 'lion', imageUrl: Lion },
    { id: '3', type: 'Parrot', imageUrl: Parrot },
    { id: '4', type: 'Fish', imageUrl: Fish },
    { id: '5', type: 'Camel', imageUrl: Camel },
  ];

  const [score, setScore] = useState(0);

  const handleDrop = (item, zoneId) => {
    if (item.id === zoneId) {
      setScore((prev) => prev + 1);
      playSound('correct');
      if (score + 1 === items.length) {
        onComplete();
      }
    } else {
      playSound('incorrect');
    }
  };

  const playSound = (type) => {
    const audio = new Audio(type === 'correct' ? '/sounds/correct.mp3' : '/sounds/incorrect.mp3');
    audio.play();
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <h2 className="text-3xl font-bold text-blue-600">Score: {score}</h2>
      <div className="flex gap-4">
        {items.map((item) => (
          <DragItem key={item.id} {...item} />
        ))}
      </div>
      <div className="flex gap-4">
        {zones.map((zone) => (
          <DropZone key={zone.id} {...zone} onDrop={handleDrop}>
            <img src={zone.imageUrl} alt="Zone" className="w-20 h-20 object-contain" />
          </DropZone>
        ))}
      </div>
    </div>
  );
};

export default GameInterface;
