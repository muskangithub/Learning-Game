import React from 'react';
import { useDrag } from 'react-dnd';

const DraggableAnimal = ({ animal }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'animal',
    item: { id: animal.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className={`p-4 rounded border ${isDragging ? 'opacity-50' : ''}`}
    >
      <img src={animal.image} alt={animal.name} className="w-16 h-16" />
      <p className="text-center mt-2">{animal.name}</p>
    </div>
  );
};

export default DraggableAnimal;
