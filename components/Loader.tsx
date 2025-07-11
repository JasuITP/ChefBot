
import React from 'react';

const Loader: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
        <div
        className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-brand-primary border-t-transparent"
        ></div>
        <p className="text-brand-subtle">Buscando las mejores opciones...</p>
    </div>
  );
};

export default Loader;
