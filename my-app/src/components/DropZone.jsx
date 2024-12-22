// components/DropZone.jsx
import React from 'react';
import { useDrop } from 'react-dnd';

const DropZone = ({ id, accept, onDrop, children }) => {
  const [{ isOver, canDrop }, drop] = useDrop(() => ({
    accept,
    drop: (item) => onDrop(item, id),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  return (
    <div
      ref={drop}
      className={`w-28 h-28 border-2 border-dashed rounded-md flex items-center justify-center ${
        isOver ? 'bg-green-200' : canDrop ? 'bg-blue-100' : 'bg-gray-100'
      }`}
    >
      {children}
    </div>
  );
};

export default DropZone;
