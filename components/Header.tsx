
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import Icon from './Icon';

const Header: React.FC = () => {
  const { cartCount, toggleCart } = useAppContext();
  const location = useLocation();

  return (
    <header className="sticky top-0 z-30 bg-brand-bg/80 backdrop-blur-sm shadow-md shadow-black/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-brand-text hover:text-brand-primary transition-colors">
            <Icon name="restaurant_menu" className="text-3xl" />
            Mercado Sabor
          </Link>
          <nav className="flex items-center gap-6">
             {location.pathname !== '/orders' && 
              <Link to="/orders" className="text-brand-subtle hover:text-brand-primary transition-colors font-medium">
                Mis Pedidos
              </Link>
            }
             {location.pathname === '/orders' && 
              <Link to="/" className="text-brand-subtle hover:text-brand-primary transition-colors font-medium">
                Inicio
              </Link>
            }
            <button
              onClick={toggleCart}
              className="relative text-brand-subtle hover:text-brand-primary transition-colors"
              aria-label="Abrir carrito"
            >
              <Icon name="shopping_cart" className="text-3xl" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-brand-primary text-xs font-bold text-white">
                  {cartCount}
                </span>
              )}
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
