
import React from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Header from './components/Header';
import CartSidebar from './components/CartSidebar';
import HomePage from './pages/HomePage';
import CheckoutPage from './pages/CheckoutPage';
import OrdersPage from './pages/OrdersPage';
import ProductDetailPage from './pages/ProductDetailPage';
import Snackbar from './components/Snackbar';

function App() {
  return (
    <AppProvider>
      <HashRouter>
        <div className="min-h-screen bg-brand-bg font-sans">
          <Header />
          <CartSidebar />
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/product/:productId" element={<ProductDetailPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/orders" element={<OrdersPage />} />
            </Routes>
          </main>
          <Snackbar />
        </div>
      </HashRouter>
    </AppProvider>
  );
}

export default App;
