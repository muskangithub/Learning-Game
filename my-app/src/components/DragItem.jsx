// components/DragItem.jsx
import React from 'react';
import { useDrag } from 'react-dnd';

const DragItem = ({ id, type, imageUrl }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type,
    item: { id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <img
      ref={drag}
      src={imageUrl}
      alt={type}
      className={`w-24 h-24 object-contain transition-transform ${
        isDragging ? 'opacity-50 scale-110' : ''
      }`}
    />
  );
};

export default DragItem;
