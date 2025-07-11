
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import Icon from './Icon';
import { CartItem } from '../types';

const CartSidebar: React.FC = () => {
  const { isCartOpen, toggleCart, cart, removeFromCart, updateQuantity, cartTotal, cartCount } = useAppContext();
  const navigate = useNavigate();

  const handleCheckout = () => {
    toggleCart();
    navigate('/checkout');
  };

  const CartItemRow: React.FC<{item: CartItem}> = ({ item }) => (
    <div className="flex items-center gap-4 py-4 border-b border-brand-light">
      <img src={item.product.imageUrl} alt={item.product.name} className="w-16 h-16 object-cover rounded-md" />
      <div className="flex-grow">
        <h4 className="font-semibold text-brand-text">{item.product.name}</h4>
        <p className="text-sm text-brand-subtle">${item.product.price.toFixed(2)}</p>
        <div className="flex items-center gap-2 mt-2">
            <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="h-6 w-6 rounded-full bg-brand-light flex items-center justify-center">-</button>
            <span>{item.quantity}</span>
            <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="h-6 w-6 rounded-full bg-brand-light flex items-center justify-center">+</button>
        </div>
      </div>
      <button onClick={() => removeFromCart(item.product.id)} className="text-brand-subtle hover:text-red-500 transition-colors">
        <Icon name="delete" />
      </button>
    </div>
  )

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/60 z-40 transition-opacity duration-300 ${isCartOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={toggleCart}
      ></div>
      <aside
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-brand-bg shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex flex-col h-full">
          <header className="flex items-center justify-between p-6 border-b border-brand-light">
            <h2 className="text-2xl font-bold">Tu Carrito</h2>
            <button onClick={toggleCart} className="text-brand-subtle hover:text-white transition-colors">
              <Icon name="close" className="text-3xl" />
            </button>
          </header>

          <div className="flex-grow p-6 overflow-y-auto">
            {cartCount > 0 ? (
                cart.map(item => <CartItemRow key={item.product.id} item={item} />)
            ) : (
                <div className="h-full flex flex-col items-center justify-center text-center text-brand-subtle">
                    <Icon name="shopping_cart_off" className="text-6xl mb-4" />
                    <p>Tu carrito está vacío.</p>
                    <p className="text-sm">¡Agregá productos para verlos acá!</p>
                </div>
            )}
          </div>
          
          {cartCount > 0 && (
            <footer className="p-6 border-t border-brand-light">
              <div className="flex justify-between items-center mb-4 text-xl">
                <span className="font-semibold">Total:</span>
                <span className="font-bold text-brand-primary">${cartTotal.toFixed(2)}</span>
              </div>
              <button
                onClick={handleCheckout}
                className="w-full bg-brand-primary text-white py-4 rounded-lg font-bold text-lg hover:bg-opacity-80 transition-all duration-200 active:scale-95"
              >
                Finalizar Compra
              </button>
            </footer>
          )}
        </div>
      </aside>
    </>
  );
};

export default CartSidebar;
