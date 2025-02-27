import React, { useRef } from 'react';
import Button from './Button';

const SearchBar = ({ onSearch }) => {
  const searchInputRef = useRef('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const searchTerm = searchInputRef.current.value.toLowerCase().trim();
    if (searchTerm) {
      onSearch(searchTerm);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        ref={searchInputRef}
        placeholder="Search Pokemon..."
        className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <Button type="submit">Search</Button>
    </form>
  );
};

export default SearchBar;