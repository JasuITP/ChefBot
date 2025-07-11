import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import Icon from '../components/Icon';
import { Order, SnackbarType } from '../types';

const CheckoutPage: React.FC = () => {
  const { cart, cartTotal, addOrder, clearCart, showSnackbar } = useAppContext();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});

  const validateForm = () => {
    const newErrors: { name?: string; email?: string } = {};
    if (!name.trim()) newErrors.name = 'El nombre es obligatorio.';
    if (!email.trim()) {
      newErrors.email = 'El email es obligatorio.';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'El formato del email no es válido.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) {
        showSnackbar('Tu carrito está vacío.', SnackbarType.ERROR);
        navigate('/');
        return;
    }
    if (validateForm()) {
      const newOrder: Order = {
        id: new Date().getTime().toString(),
        items: cart,
        total: cartTotal,
        date: new Date().toISOString(),
        customer: { name, email },
      };
      addOrder(newOrder);
      clearCart();
      showSnackbar('¡Pedido realizado con éxito!', SnackbarType.SUCCESS);
      navigate('/orders');
    }
  };
  
  if (cart.length === 0 && !Object.keys(errors).length) {
      return (
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
              <Icon name="production_quantity_limits" className="text-6xl text-brand-subtle mb-4" />
              <h1 className="text-3xl font-bold mb-4">Tu carrito está vacío</h1>
              <p className="text-brand-subtle mb-6">No hay nada para procesar. ¡Volvé a la tienda para agregar productos!</p>
              <button onClick={() => navigate('/')} className="bg-brand-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-opacity-80 transition-transform duration-200 active:scale-95">
                  Volver a la Tienda
              </button>
          </div>
      )
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold mb-8 text-center">Finalizar Compra</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Form Section */}
        <div className="bg-brand-light p-8 rounded-lg">
          <h2 className="text-2xl font-bold mb-6">Tus Datos</h2>
          <form onSubmit={handleSubmit} noValidate>
            <div className="mb-4">
              <label htmlFor="name" className="block text-brand-subtle mb-2">Nombre Completo</label>
              <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} className="w-full bg-brand-bg p-3 rounded-md border border-brand-light focus:outline-none focus:ring-2 focus:ring-brand-primary" />
              {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
            </div>
            <div className="mb-6">
              <label htmlFor="email" className="block text-brand-subtle mb-2">Email</label>
              <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-brand-bg p-3 rounded-md border border-brand-light focus:outline-none focus:ring-2 focus:ring-brand-primary" />
              {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
            </div>
            <button type="submit" className="w-full bg-brand-primary text-white py-4 rounded-lg font-bold text-lg hover:bg-opacity-80 transition-transform duration-200 active:scale-95">
              Confirmar Pedido
            </button>
          </form>
        </div>

        {/* Order Summary Section */}
        <div className="bg-brand-light p-8 rounded-lg">
          <h2 className="text-2xl font-bold mb-6">Resumen del Pedido</h2>
          <div className="space-y-4">
            {cart.map(item => (
              <div key={item.product.id} className="flex justify-between items-center">
                <div>
                  <p className="font-semibold">{item.product.name} <span className="text-brand-subtle">x{item.quantity}</span></p>
                  <p className="text-sm text-brand-subtle">{item.product.restaurant}</p>
                </div>
                <p className="font-medium">${(item.product.price * item.quantity).toFixed(2)}</p>
              </div>
            ))}
          </div>
          <hr className="my-6 border-brand-bg" />
          <div className="flex justify-between items-center text-xl font-bold">
            <p>Total</p>
            <p className="text-brand-primary">${cartTotal.toFixed(2)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;