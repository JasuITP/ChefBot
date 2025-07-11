
import React from 'react';
import SearchBar from './SearchBar';

interface HeroProps {
    onSearch: (query: string) => void;
    isLoading: boolean;
}

const Hero: React.FC<HeroProps> = ({ onSearch, isLoading }) => {
  return (
    <div className="relative h-[60vh] min-h-[400px] flex items-center justify-center text-center px-4 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center z-0" style={{ backgroundImage: "url('https://picsum.photos/seed/couch-person/1600/900')" }}>
            <div className="absolute inset-0 bg-black/70"></div>
        </div>
        <div className="relative z-10 flex flex-col items-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white drop-shadow-lg mb-6">
                ¿Qué tenés ganas de comer hoy?
            </h1>
            <SearchBar onSearch={onSearch} isLoading={isLoading} />
        </div>
    </div>
  );
};

export default Hero;
