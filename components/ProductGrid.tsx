
import React from 'react';
import { Product } from '../types';
import ProductCard from './ProductCard';
import Loader from './Loader';

interface ProductGridProps {
  products: Product[];
  isLoading: boolean;
  error: string | null;
  searched: boolean;
}

const ProductGrid: React.FC<ProductGridProps> = ({ products, isLoading, error, searched }) => {
  if (isLoading) {
    return <div className="flex justify-center items-center py-20"><Loader /></div>;
  }

  if (error) {
    return <div className="text-center py-20 text-red-400">{error}</div>;
  }
  
  if (searched && products.length === 0) {
      return <div className="text-center py-20 text-brand-subtle">No encontramos productos que coincidan con tu búsqueda. ¡Intenta con otra cosa!</div>;
  }

  if (products.length === 0) {
    return null; // Don't show anything if no search has been performed yet
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h2 className="text-3xl font-bold mb-8 text-brand-text">Recomendaciones para vos</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;
