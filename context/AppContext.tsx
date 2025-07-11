
import React, { createContext, useState, useContext, ReactNode, useCallback } from 'react';
import { CartItem, Order, SnackbarState, SnackbarType } from '../types';

interface AppContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartTotal: number;
  isCartOpen: boolean;
  toggleCart: () => void;
  orders: Order[];
  addOrder: (order: Order) => void;
  snackbar: SnackbarState;
  showSnackbar: (message: string, type: SnackbarType) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [orders, setOrders] = useState<Order[]>(() => {
    const savedOrders = localStorage.getItem('mercadoSaborOrders');
    return savedOrders ? JSON.parse(savedOrders) : [];
  });
  const [snackbar, setSnackbar] = useState<SnackbarState>({ message: '', type: SnackbarType.SUCCESS, isOpen: false });

  const addToCart = (newItem: CartItem) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.product.id === newItem.product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.product.id === newItem.product.id
            ? { ...item, quantity: item.quantity + newItem.quantity }
            : item
        );
      }
      return [...prevCart, newItem];
    });
  };

  const removeFromCart = (productId: number) => {
    setCart(prevCart => prevCart.filter(item => item.product.id !== productId));
  };

  const updateQuantity = (productId: number, quantity: number) => {
    setCart(prevCart =>
      prevCart.map(item =>
        item.product.id === productId ? { ...item, quantity } : item
      ).filter(item => item.quantity > 0)
    );
  };
  
  const clearCart = () => setCart([]);

  const toggleCart = () => setIsCartOpen(prev => !prev);

  const addOrder = (newOrder: Order) => {
    setOrders(prevOrders => {
        const updatedOrders = [...prevOrders, newOrder];
        localStorage.setItem('mercadoSaborOrders', JSON.stringify(updatedOrders));
        return updatedOrders;
    });
  };

  const showSnackbar = useCallback((message: string, type: SnackbarType) => {
    setSnackbar({ message, type, isOpen: true });
    setTimeout(() => {
        setSnackbar({ message: '', type, isOpen: false });
    }, 3000);
  }, []);

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = cart.reduce((total, item) => total + item.product.price * item.quantity, 0);

  return (
    <AppContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      cartCount,
      cartTotal,
      isCartOpen,
      toggleCart,
      orders,
      addOrder,
      snackbar,
      showSnackbar,
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
