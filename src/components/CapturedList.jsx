import React from 'react';
import { usePokemonContext } from './PokemonContext';
import PokemonCard from './PokemonCard';

const CapturedList = () => {
  const { state } = usePokemonContext();

  if (state.capturedPokemons.length === 0) {
    return (
      <div className="text-center text-gray-600 py-8">
        No Pokemon captured yet!
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {state.capturedPokemons.map(pokemon => (
        <PokemonCard
          key={`${pokemon.id}-${pokemon.captureDate}`}
          pokemon={pokemon}
          showCaptureButton={false}
        />
      ))}
    </div>
  );
};

export default CapturedList;