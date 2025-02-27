import React from 'react';

const pokeballs = [
  {
    id: 'pokeball',
    name: 'Poké Ball',
    image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png',
    catchRate: 1,
    description: 'La Poké Ball básica para atrapar Pokémon'
  },
  {
    id: 'greatball',
    name: 'Great Ball',
    image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/great-ball.png',
    catchRate: 1.5,
    description: 'Una Poké Ball de mejor calidad'
  },
  {
    id: 'ultraball',
    name: 'Ultra Ball',
    image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/ultra-ball.png',
    catchRate: 2,
    description: 'Una Poké Ball de alta calidad'
  },
  {
    id: 'masterball',
    name: 'Master Ball',
    image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/master-ball.png',
    catchRate: 255,
    description: 'La mejor Poké Ball, nunca falla'
  },
  {
    id: 'fastball',
    name: 'Fast Ball',
    image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/fast-ball.png',
    catchRate: 4,
    description: 'Mejor para Pokémon veloces'
  },
  {
    id: 'heavyball',
    name: 'Heavy Ball',
    image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/heavy-ball.png',
    catchRate: 1.5,
    description: 'Mejor para Pokémon pesados'
  }
];

const PokeBallSelector = ({ selectedPokeball, onSelect }) => {
  return (
    <div className="flex flex-row gap-4 justify-center mb-4 overflow-x-auto py-2">
      {pokeballs.map((pokeball) => (
        <button
          key={pokeball.id}
          onClick={() => onSelect(pokeball)}
          className={`p-2 rounded-lg transition-all transform hover:scale-110 ${selectedPokeball?.id === pokeball.id ? 'ring-2 ring-blue-500' : ''}`}
          title={`${pokeball.name} - ${pokeball.description}`}
        >
          <img src={pokeball.image} alt={pokeball.name} className="w-8 h-8" />
        </button>
      ))}
    </div>
  );
};

export default PokeBallSelector;