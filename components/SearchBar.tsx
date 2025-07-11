
import React, { useState } from 'react';
import Icon from './Icon';

interface SearchBarProps {
    onSearch: (query: string) => void;
    isLoading: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, isLoading }) => {
  const [query, setQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim() && !isLoading) {
      onSearch(query.trim());
    }
  };
  
  const handleSuggestionClick = (suggestion: string) => {
      setQuery(suggestion);
      onSearch(suggestion);
  }

  const suggestions = ["Picada con amigos", "Comidas bajas en calorías", "Algo dulce para el postre", "Un buen asado"];

  return (
    <div className="w-full max-w-2xl">
      <form onSubmit={handleSearch} className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Tengo ganas de comer algo dulce..."
          className="w-full h-16 pl-6 pr-16 rounded-full bg-white/20 backdrop-blur-sm text-white placeholder-gray-300 border-2 border-transparent focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/50 transition-all duration-300"
          disabled={isLoading}
        />
        <button
          type="submit"
          className="absolute right-3 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-brand-primary hover:bg-opacity-80 flex items-center justify-center transition-transform duration-200 active:scale-90 disabled:bg-gray-500 disabled:cursor-not-allowed"
          disabled={isLoading}
        >
          <Icon name="search" className="text-white text-3xl" />
        </button>
      </form>
      <div className="mt-4 flex flex-wrap justify-center gap-2">
        {suggestions.map(suggestion => (
            <button 
                key={suggestion} 
                onClick={() => handleSuggestionClick(suggestion)}
                className="px-4 py-2 text-sm bg-white/10 backdrop-blur-sm rounded-full hover:bg-brand-primary/50 transition-colors disabled:opacity-50"
                disabled={isLoading}
            >
                {suggestion}
            </button>
        ))}
      </div>
    </div>
  );
};

export default SearchBar;
