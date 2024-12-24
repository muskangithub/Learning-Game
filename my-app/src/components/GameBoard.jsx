import React, { useState } from 'react';
import DragItem from './DragItem';
import DropZone from './DropZone';
import Lion from '../assets/images/Lion.jpg';
import Panda from '../assets/images/panda.jpg';
import Parrot from '../assets/images/parrot.jpeg';
import Fish from '../assets/images/fish.jpg';
import Camel from '../assets/images/camel.jpeg';
import Desert from '../assets/images/desert.jpeg';
import Ocean from '../assets/images/ocean.jpeg';
import Bamboo from '../assets/images/bamboo.jpeg';
import Nest from '../assets/images/nest.jpeg';
import Jungle from '../assets/images/jungle.jpeg';

const GameInterface = ({ onComplete }) => {
  const initialZones = [
    { id: '1', accept: 'desert', imageUrl: Desert, droppedItem: null },
    { id: '2', accept: 'ocean', imageUrl: Ocean, droppedItem: null },
    { id: '3', accept: 'bamboo', imageUrl: Bamboo, droppedItem: null },
    { id: '4', accept: 'nest', imageUrl: Nest, droppedItem: null },
    { id: '5', accept: 'jungle', imageUrl: Jungle, droppedItem: null },
  ];

  const items = [
    { id: '3', type: 'panda', habitat: 'bamboo', imageUrl: Panda },
    { id: '5', type: 'lion', habitat: 'jungle', imageUrl: Lion },
    { id: '4', type: 'parrot', habitat: 'nest', imageUrl: Parrot },
    { id: '2', type: 'fish', habitat: 'ocean', imageUrl: Fish },
    { id: '1', type: 'camel', habitat: 'desert', imageUrl: Camel },
  ];

  const [zones, setZones] = useState(initialZones);
  const [score, setScore] = useState(0);

  const handleDrop = (item, zoneId) => {
    const zoneIndex = zones.findIndex((z) => z.id === zoneId);
    const zone = zones[zoneIndex];
    const isCorrect = zone.accept === item.habitat;

    if (isCorrect) {
      // Set the dropped item in the corresponding zone
      const updatedZones = [...zones];
      updatedZones[zoneIndex] = {
        ...zone,
        droppedItem: item,
      };
      setZones(updatedZones);

      // Update score and check for completion
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
        {items
          .filter((item) => !zones.some((zone) => zone.droppedItem?.id === item.id)) // Only show undropped items
          .map((item) => (
            <DragItem key={item.id} {...item} />
          ))}
      </div>
      <div className="flex gap-4">
        {zones.map((zone) => (
          <DropZone key={zone.id} {...zone} onDrop={(item) => handleDrop(item, zone.id)}>
            <div className="relative">
              <img src={zone.imageUrl} alt="Zone" className="w-20 h-20 object-contain" />
              {zone.droppedItem && (
                <img
                  src={zone.droppedItem.imageUrl}
                  alt={zone.droppedItem.type}
                  className="absolute w-16 h-16 object-contain"
                />
              )}
            </div>
          </DropZone>
        ))}
      </div>
    </div>
  );
};

export default GameInterface;
