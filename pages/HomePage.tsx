
import React, { useState, useEffect } from 'react';
import Hero from '../components/Hero';
import ProductGrid from '../components/ProductGrid';
import { getRecommendedProductIds } from '../services/geminiService';
import { Product } from '../types';
import { ALL_PRODUCTS } from '../constants';

const HomePage: React.FC = () => {
  const [recommendedProducts, setRecommendedProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    // Show some initial products on first load
    const initialProducts = ALL_PRODUCTS.slice(0, 4);
    setRecommendedProducts(initialProducts);
  }, []);

  const handleSearch = async (query: string) => {
    setIsLoading(true);
    setError(null);
    setHasSearched(true);
    try {
      const ids = await getRecommendedProductIds(query, ALL_PRODUCTS);
      const filteredProducts = ALL_PRODUCTS.filter(p => ids.includes(p.id));
      // Preserve order from recommendation
      const orderedProducts = ids.map(id => filteredProducts.find(p => p.id === id)).filter((p): p is Product => p !== undefined);
      setRecommendedProducts(orderedProducts);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Ocurrió un error inesperado.");
      }
      setRecommendedProducts([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Hero onSearch={handleSearch} isLoading={isLoading} />
      <ProductGrid 
        products={recommendedProducts} 
        isLoading={isLoading} 
        error={error} 
        searched={hasSearched} 
      />
    </div>
  );
};

export default HomePage;
