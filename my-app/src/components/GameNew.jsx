import React, { useState, useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Lion from '../assets/images/Lion.jpg';
import Panda from '../assets/images/panda.jpg';
import Parrot from '../assets/images/parrot.jpeg';
import Fish from '../assets/images/fish.jpg';
import Camel from '../assets/images/camel.jpeg';
import Sparrow from '../assets/images/sparrow.jpeg';
import Octopus from '../assets/images/octopus.jpeg';
import Giraffe from '../assets/images/giraff.jpeg';
import Crocodile from '../assets/images/crocodile.jpeg';
import Elephant from '../assets/images/elephant.jpeg';
import clappingSound from "../assets/sound/clap.mp3"; 
import sadSound from "../assets/sound/wrong.mp3";
import DraggableAnimal from './DraggableAnimal'
import HabitatDropZone from './HabitatDropZone'
import {fetchGameData} from '../utils/fetchData'

// Initial Animal data
const initialAnimals = [
  { id: '3', name: 'panda', habitat: 'bamboo', image: Panda },
  { id: '5', name: 'lion', habitat: 'jungle', image: Lion },
  { id: '4', name: 'parrot', habitat: 'nest', image: Parrot },
  { id: '2', name: 'fish', habitat: 'ocean', image: Fish },
  { id: '1', name: 'camel', habitat: 'desert', image: Camel },
  { id: '6', name: 'sparrow', habitat: 'nest', image: Sparrow },
  { id: '7', name: 'octopus', habitat: 'ocean', image: Octopus },
  { id: '8', name: 'giraffe', habitat: 'jungle', image: Giraffe },
  { id: '9', name: 'crocodile', habitat: 'ocean', image: Crocodile },
  { id: '10', name: 'elephant', habitat: 'jungle', image: Elephant },
];

const GameNew = ({ onComplete,setScore,score }) => {
  const [availableAnimals, setAvailableAnimals] = useState(initialAnimals);
  const [habitatZones, setHabitatZones] = useState({
    bamboo: [],
    ocean: [],
    jungle: [],
    nest: [],
    desert: [],
  });
  const data=fetchGameData()
  console.log(data,"dattatat")
  
  const [feedback, setFeedback] = useState('');
  const [isGameComplete, setIsGameComplete] = useState(false);

   const clappingAudio = new Audio(clappingSound);
  const sadAudio = new Audio(sadSound);

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

  // Check if game is complete using useEffect
  useEffect(() => {
    if (availableAnimals.length === 0) {
      console.log('Last animal dropped, setting game complete...');
      setTimeout(() => { setIsGameComplete(true)}, 500);
    }
  }, [availableAnimals]); 

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
    setFeedback('');
    setIsGameComplete(false);
     onComplete(); // Reset game completion state
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