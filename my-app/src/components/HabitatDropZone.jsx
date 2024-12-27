import React from 'react';
import { useDrop } from 'react-dnd';

const HabitatDropZone = ({ habitat, animalsInZone, onDrop }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'animal',
    drop: (item) => onDrop(item, habitat),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <div
      ref={drop}
      className={`p-6 border-2 rounded min-h-[150px] ${isOver ? 'bg-green-200' : 'bg-gray-100'}`}
    >
      <p className="text-center font-bold mb-2">{habitat}</p>
      <div className="flex flex-wrap gap-2">
        {animalsInZone.map(({ animal, isCorrect }) => (
          <div
            key={animal.id}
            className={`w-16 h-16 border-2 ${
              isCorrect ? 'border-green-500' : 'border-red-500'
            }`}
          >
            <img src={animal.image} alt={animal.name} className="w-full h-full object-cover" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default HabitatDropZone;
