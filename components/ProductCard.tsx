
import React from 'react';
import { Link } from 'react-router-dom';
import { Product, SnackbarType } from '../types';
import { useAppContext } from '../context/AppContext';
import Icon from './Icon';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, showSnackbar } = useAppContext();

  const handleAddToCart = () => {
    addToCart({ product, quantity: 1 });
    showSnackbar(`${product.name} agregado al carrito`, SnackbarType.SUCCESS);
  };

  return (
    <div className="bg-brand-light rounded-lg overflow-hidden shadow-lg hover:shadow-brand-primary/30 transition-shadow duration-300 group flex flex-col">
      <Link to={`/product/${product.id}`} className="block">
        <div className="relative overflow-hidden">
          <img src={product.imageUrl} alt={product.name} className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500" />
          <div className="absolute top-2 right-2 bg-brand-bg/70 px-2 py-1 rounded-full text-xs font-semibold">{product.category}</div>
        </div>
        <div className="p-4">
          <h3 className="text-xl font-bold text-brand-text mb-2 truncate">{product.name}</h3>
          <p className="text-brand-subtle text-sm mb-3">{product.restaurant}</p>
          <div className="flex justify-between items-center text-sm text-brand-subtle">
            <div className="flex items-center gap-1">
              <Icon name="star" className="text-yellow-400 text-base" />
              <span className="font-semibold text-brand-text">{product.rating.toFixed(1)}</span>
            </div>
            <div className="flex items-center gap-1">
              <Icon name="timer" className="text-base" />
              <span>{product.prepTime} min</span>
            </div>
          </div>
        </div>
      </Link>
      <div className="p-4 pt-0 mt-auto">
        <div className="flex justify-between items-center">
          <p className="text-2xl font-bold text-brand-primary">${product.price.toFixed(2)}</p>
          <button
            onClick={handleAddToCart}
            className="bg-brand-primary text-white px-4 py-2 rounded-lg font-semibold hover:bg-opacity-80 transition-transform duration-200 active:scale-95 flex items-center gap-2"
          >
            <Icon name="add_shopping_cart" />
            <span>Agregar</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
