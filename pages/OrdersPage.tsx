
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { Order } from '../types';
import Icon from '../components/Icon';

const OrderItem: React.FC<{ item: Order['items'][0] }> = ({ item }) => (
    <div className="flex items-center gap-4 py-2">
        <img src={item.product.imageUrl} alt={item.product.name} className="w-12 h-12 object-cover rounded-md" />
        <div className="flex-grow">
            <p className="font-semibold text-brand-text">{item.product.name}</p>
            <p className="text-sm text-brand-subtle">{item.product.restaurant}</p>
        </div>
        <div className="text-right">
            <p className="text-brand-subtle">x{item.quantity}</p>
            <p className="font-medium">${(item.product.price * item.quantity).toFixed(2)}</p>
        </div>
    </div>
);


const OrderCard: React.FC<{ order: Order }> = ({ order }) => (
    <div className="bg-brand-light p-6 rounded-lg shadow-md hover:shadow-brand-primary/20 transition-shadow">
        <div className="flex justify-between items-start mb-4 border-b border-brand-bg pb-4">
            <div>
                <h3 className="text-xl font-bold text-brand-text">Pedido #{order.id.slice(-6)}</h3>
                <p className="text-sm text-brand-subtle">Realizado el: {new Date(order.date).toLocaleDateString()}</p>
            </div>
            <div className="text-right">
                <p className="text-lg font-bold text-brand-primary">${order.total.toFixed(2)}</p>
                <p className="text-sm text-brand-subtle">Total</p>
            </div>
        </div>
        <div className="space-y-2">
            {order.items.map(item => <OrderItem key={item.product.id} item={item} />)}
        </div>
    </div>
);


const OrdersPage: React.FC = () => {
  const { orders } = useAppContext();
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold mb-8 text-center">Mis Pedidos</h1>
      {orders.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[...orders].reverse().map(order => (
                <OrderCard key={order.id} order={order} />
            ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <Icon name="receipt_long" className="text-6xl text-brand-subtle mb-4" />
          <h2 className="text-2xl font-semibold mb-2">Aún no tenés pedidos</h2>
          <p className="text-brand-subtle mb-6">Cuando hagas tu primer pedido, lo verás acá.</p>
          <button onClick={() => navigate('/')} className="bg-brand-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-opacity-80 transition-transform duration-200 active:scale-95">
            Ir a la Tienda
          </button>
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
