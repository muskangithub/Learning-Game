import React, { useState, useEffect } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Lion from '../assets/images/Lion.jpg';
import Panda from '../assets/images/panda.jpg';
import Parrot from '../assets/images/parrot.jpeg';
import Fish from '../assets/images/fish.jpg';
import Camel from '../assets/images/camel.jpeg';

// Initial Animal data
const initialAnimals = [
  { id: '3', name: 'panda', habitat: 'bamboo', image: Panda },
  { id: '5', name: 'lion', habitat: 'jungle', image: Lion },
  { id: '4', name: 'parrot', habitat: 'nest', image: Parrot },
  { id: '2', name: 'fish', habitat: 'ocean', image: Fish },
  { id: '1', name: 'camel', habitat: 'desert', image: Camel },
];

// Component for draggable animals
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

// Component for habitat drop zones
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

// Main Component
const GameNew = () => {
  const [availableAnimals, setAvailableAnimals] = useState(initialAnimals);
  const [habitatZones, setHabitatZones] = useState({
    bamboo: [],
    ocean: [],
    jungle: [],
    nest: [],
    desert: [],
  });
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [isGameComplete, setIsGameComplete] = useState(false);

  // Handle animal drop
  const handleDrop = (item, habitat) => {
    const animal = availableAnimals.find((a) => a.id === item.id);
    if (!animal) return;

    const isCorrect = animal.habitat === habitat;

    setAvailableAnimals((prev) => prev.filter((a) => a.id !== item.id)); // Remove animal from available list
    setHabitatZones((prev) => {
      const updatedZone = [...prev[habitat], { animal, isCorrect }];
      return { ...prev, [habitat]: updatedZone };
    });

    if (isCorrect) {
      setScore((prev) => prev + 1);
      setFeedback(`🎉 Cheers! ${animal.name} lives in the ${habitat}!`);
    } else {
      setFeedback(`😞 Don't give up! ${animal.name} doesn't live in the ${habitat}. Try again!`);
    }

    // Automatically clear feedback after 3 seconds
    setTimeout(() => setFeedback(''), 3000);
  };

  // Check if game is complete using useEffect
  useEffect(() => {
    console.log('Remaining animals:', availableAnimals.length); // Log remaining animals

    if (availableAnimals.length === 0) {
      console.log('Last animal dropped, setting game complete...');
      setTimeout(() => {
        setIsGameComplete(true);
      }, 500); // Small delay for the last drop animation
    }
  }, [availableAnimals]); // Re-run whenever availableAnimals change

  // Restart the game
  const handleRestart = () => {
    setAvailableAnimals(initialAnimals);
    setHabitatZones({
      bamboo: [],
      ocean: [],
      jungle: [],
      nest: [],
      desert: [],
    });
    setScore(0);
    setFeedback('');
    setIsGameComplete(false); // Reset game completion state
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="p-6 space-y-6">
        <h1 className="text-2xl font-bold text-center">Match Animals to Habitats</h1>
        <div className="flex space-x-4">
          {availableAnimals.map((animal) => (
            <DraggableAnimal key={animal.id} animal={animal} />
          ))}
        </div>
        <div className="grid grid-cols-3 gap-4">
          {Object.keys(habitatZones).map((habitat) => (
            <HabitatDropZone
              key={habitat}
              habitat={habitat}
              animalsInZone={habitatZones[habitat]}
              onDrop={handleDrop}
            />
          ))}
        </div>
        <div className="text-center">
          <p className="text-xl">Score: {score}</p>
          {feedback && (
            <p
              className={`mt-4 p-2 rounded text-lg ${
                feedback.includes('🎉') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
              }`}
            >
              {feedback}
            </p>
          )}
        </div>

        {/* Show celebratory modal when game is complete */}
        {isGameComplete && (
          <div className="fixed inset-0 z-50 bg-black bg-opacity-75 flex flex-col items-center justify-center text-white">
            <h2 className="text-4xl font-bold mb-4">🎉 Congratulations! 🎉</h2>
            <p className="text-xl mb-6">You've completed the game!</p>
            <button
              onClick={handleRestart}
              className="px-6 py-3 bg-green-500 rounded hover:bg-green-600"
            >
              Restart Game
            </button>
          </div>
        )}
      </div>
    </DndProvider>
  );
};

export default GameNew;
