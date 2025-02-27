import React, { useState } from 'react';
import Button from './Button';
import { usePokemonContext } from './PokemonContext';
import PokeBallSelector from './PokeBallSelector';

const PokemonCard = ({ pokemon, showCaptureButton = true }) => {
  const { state, dispatch } = usePokemonContext();
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [popupType, setPopupType] = useState('');
  const [selectedPokeball, setSelectedPokeball] = useState(null);

  const handleCapture = (pokeball) => {
    setSelectedPokeball(pokeball);
    const isAlreadyCaptured = state.capturedPokemons.some(p => p.id === pokemon.id);
    
    if (isAlreadyCaptured) {
      showNotification('¡Este Pokémon ya ha sido capturado!', 'error');
      return;
    }

    let catchRate = pokeball.catchRate;
    
    if (pokeball.id === 'fastball' && pokemon.stats?.some(stat => stat.stat.name === 'speed' && stat.base_stat > 100)) {
      catchRate *= 4;
    } else if (pokeball.id === 'heavyball' && pokemon.weight > 2000) {
      catchRate += 20;
    }

    const catchProbability = Math.min(catchRate / 255, 1);
    const isSuccessful = Math.random() < catchProbability;

    if (!isSuccessful && pokeball.id !== 'masterball') {
      showNotification(`¡${pokemon.name} se ha escapado!`, 'error');
      return;
    }

    dispatch({
      type: 'CAPTURE_POKEMON',
      payload: {
        id: pokemon.id,
        name: pokemon.name,
        height: pokemon.height,
        weight: pokemon.weight,
        image: pokemon.sprites.front_default,
        pokeball: pokeball
      }
    });
    showNotification(`¡Has capturado a ${pokemon.name}!`, 'success');
  };

  const showNotification = (message, type) => {
    setPopupMessage(message);
    setPopupType(type);
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 3000);
  };

  const handleRelease = () => {
    dispatch({
      type: 'RELEASE_POKEMON',
      payload: pokemon.id
    });
  };

  return (
    <div className="relative p-4 border rounded-lg shadow-md bg-white">
      {showPopup && (
        <div className={`absolute top-0 left-0 right-0 p-3 text-center text-white rounded-t-lg transition-all transform ${popupType === 'success' ? 'bg-green-500' : 'bg-red-500'} animate-fade-in-down`}>
          {popupMessage}
        </div>
      )}
      <img
        src={pokemon.sprites?.front_default || pokemon.image}
        alt={pokemon.name}
        className="w-32 h-32 mx-auto"
      />
      <h2 className="text-xl font-bold text-center capitalize mb-2">{pokemon.name}</h2>
      <div className="text-gray-600 mb-4">
        <p>Height: {pokemon.height / 10}m</p>
        <p>Weight: {pokemon.weight / 10}kg</p>
        {pokemon.captureDate && (
          <>
            <p>Captured: {new Date(pokemon.captureDate).toLocaleString()}</p>
            <p>Caught with: {pokemon.pokeball?.name}</p>
          </>
        )}
      </div>
      {showCaptureButton ? (
        <>
          <PokeBallSelector
            selectedPokeball={selectedPokeball}
            onSelect={handleCapture}
          />
        </>
      ) : (
        <Button onClick={handleRelease} className="w-full bg-red-500 hover:bg-red-600">
          Release
        </Button>
      )}
    </div>
  );
};

export default PokemonCard;