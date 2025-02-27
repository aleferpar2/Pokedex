import React, { createContext, useContext, useReducer, useEffect } from 'react';

const PokemonContext = createContext();

const initialState = {
  capturedPokemons: JSON.parse(localStorage.getItem('capturedPokemons')) || []
};

const pokemonReducer = (state, action) => {
  switch (action.type) {
    case 'CAPTURE_POKEMON':
      const newPokemon = {
        ...action.payload,
        captureDate: new Date().toISOString()
      };
      return {
        ...state,
        capturedPokemons: [...state.capturedPokemons, newPokemon]
      };
    case 'RELEASE_POKEMON':
      return {
        ...state,
        capturedPokemons: state.capturedPokemons.filter(
          pokemon => pokemon.id !== action.payload
        )
      };
    default:
      return state;
  }
};

export const PokemonProvider = ({ children }) => {
  const [state, dispatch] = useReducer(pokemonReducer, initialState);

  useEffect(() => {
    localStorage.setItem('capturedPokemons', JSON.stringify(state.capturedPokemons));
  }, [state.capturedPokemons]);

  return (
    <PokemonContext.Provider value={{ state, dispatch }}>
      {children}
    </PokemonContext.Provider>
  );
};

export const usePokemonContext = () => {
  const context = useContext(PokemonContext);
  if (!context) {
    throw new Error('usePokemonContext must be used within a PokemonProvider');
  }
  return context;
};