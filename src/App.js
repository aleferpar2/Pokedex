import React, { useState } from 'react';
import './App.css';
import SearchBar from './components/SearchBar';
import PokemonCard from './components/PokemonCard';
import CapturedList from './components/CapturedList';
import Button from './components/Button';
import useFetch from './components/useFetch';
import { PokemonProvider } from './components/PokemonContext';

function App() {
  const [searchUrl, setSearchUrl] = useState('');
  const [showCaptured, setShowCaptured] = useState(false);
  const { data: pokemon, loading, error } = useFetch(
    searchUrl ? `https://pokeapi.co/api/v2/pokemon/${searchUrl}` : null
  );

  const handleSearch = (searchTerm) => {
    setSearchUrl(searchTerm);
    setShowCaptured(false);
  };

  const toggleCapturedList = () => {
    setShowCaptured(!showCaptured);
    setSearchUrl('');
  };

  return (
    <PokemonProvider>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-4xl font-bold text-center mb-8">Pokédex</h1>
        <div className="mb-6">
          <SearchBar onSearch={handleSearch} />
        </div>
        <div className="mb-6 text-center">
          <Button onClick={toggleCapturedList}>
            {showCaptured ? 'Search Pokemon' : 'View Captured'}
          </Button>
        </div>
        {!showCaptured && (
          <div className="mb-8">
            {loading && <div className="text-center">Loading...</div>}
            {error && <div className="text-center text-red-500">{error}</div>}
            {pokemon && <PokemonCard pokemon={pokemon} />}
          </div>
        )}
        {showCaptured && <CapturedList />}
      </div>
    </PokemonProvider>
  );
}

export default App;
