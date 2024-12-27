import React, { useState, useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import DraggableAnimal from './DraggableAnimal';
import HabitatDropZone from './HabitatDropZone';
import clappingSound from "../assets/sound/clap.mp3"; 
import sadSound from "../assets/sound/wrong.mp3";

// Game Component
const GameNew = ({ onComplete, setScore, score }) => {
  const [availableAnimals, setAvailableAnimals] = useState([]);
  const [habitatZones, setHabitatZones] = useState({
    bamboo: [],
    ocean: [],
    jungle: [],
    nest: [],
    desert: [],
  });
  const [feedback, setFeedback] = useState('');
  const [isGameComplete, setIsGameComplete] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const clappingAudio = new Audio(clappingSound);
  const sadAudio = new Audio(sadSound);

  // Fetch animal data from API
  useEffect(() => {
    const fetchAnimals = async () => {
      try {
        const response = await fetch('https://www.freetestapi.com/api/v1/animals');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        // Map fetched data to fit the structure used in your app
        const mappedAnimals = data.map((animal) => ({
          id: animal.id.toString(),
          name: animal.name.toLowerCase(),
          habitat: animal.habitat.toLowerCase(),
          image: animal.image, // Ensure the API provides a valid image URL
        }));

        setAvailableAnimals(mappedAnimals);
         setIsLoading(false);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnimals();
  }, []);

  // Handle drop logic
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
      clappingAudio.play();
    } else {
      setFeedback(`😞 Don't give up! ${animal.name} doesn't live in the ${habitat}. Try again!`);
      sadAudio.play();
    }

    // Automatically clear feedback after 3 seconds
    setTimeout(() => setFeedback(''), 2000);
  };

  // Check game completion
  useEffect(() => {
    if (availableAnimals.length === 0 && !isLoading) {
      setTimeout(() => setIsGameComplete(true), 500);
    }
  }, [availableAnimals, isLoading]);

  // Restart the game
  const handleRestart = () => {
    setAvailableAnimals([]);
    setHabitatZones({
      bamboo: [],
      ocean: [],
      jungle: [],
      nest: [],
      desert: [],
    });
    setFeedback('');
    setIsGameComplete(false);
    onComplete(); // Reset game completion state
  };

  if (isLoading) {
    return <p>Loading animals...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

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
                feedback.includes('🎉') ? 'bg-green-200 text-green-700' : 'bg-red-200 text-red-700'
              }`}
            >
              {feedback}
            </p>
          )}
        </div>

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
