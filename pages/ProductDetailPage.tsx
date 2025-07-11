import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { Product, SnackbarType } from '../types';
import { ALL_PRODUCTS } from '../constants';
import Icon from '../components/Icon';
import Loader from '../components/Loader';

const ProductDetailPage: React.FC = () => {
    const { productId } = useParams<{ productId: string }>();
    const navigate = useNavigate();
    const { addToCart, showSnackbar } = useAppContext();

    const [product, setProduct] = useState<Product | undefined>(undefined);
    const [isLoading, setIsLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        setIsLoading(true);
        if (productId) {
            const foundProduct = ALL_PRODUCTS.find(p => p.id === parseInt(productId, 10));
            setProduct(foundProduct);
        }
        // Simulate a small delay for a better UX, even if data is local
        setTimeout(() => setIsLoading(false), 200); 
    }, [productId]);
    
    const handleAddToCart = () => {
        if (product) {
            addToCart({ product, quantity });
            showSnackbar(`${quantity} x ${product.name} agregado al carrito`, SnackbarType.SUCCESS);
        }
    };

    if (isLoading) {
        return <div className="min-h-[calc(100vh-80px)] flex justify-center items-center"><Loader /></div>;
    }

    if (!product) {
        return (
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
                <Icon name="fastfood" className="text-6xl text-brand-subtle mb-4" />
                <h1 className="text-3xl font-bold mb-4">Producto no encontrado</h1>
                <p className="text-brand-subtle mb-6">No pudimos encontrar el plato que estás buscando.</p>
                <button onClick={() => navigate('/')} className="bg-brand-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-opacity-80 transition-transform duration-200 active:scale-95">
                    Volver al Inicio
                </button>
            </div>
        )
    }

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fade-in">
            <div className="mb-8">
                <Link to="/" className="text-brand-subtle hover:text-brand-primary transition-colors flex items-center gap-2">
                    <Icon name="arrow_back" />
                    Volver a las recomendaciones
                </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                {/* Image Column */}
                <div>
                    <img src={product.imageUrl} alt={product.name} className="w-full h-auto object-cover rounded-lg shadow-lg" />
                </div>

                {/* Details Column */}
                <div className="flex flex-col">
                    <span className="bg-brand-primary/20 text-brand-primary text-sm font-bold px-3 py-1 rounded-full self-start mb-3">{product.category}</span>
                    <h1 className="text-4xl lg:text-5xl font-bold text-brand-text mb-2">{product.name}</h1>
                    <p className="text-xl text-brand-subtle mb-4">por {product.restaurant}</p>
                    
                    <div className="flex items-center gap-6 text-brand-subtle mb-6">
                        <div className="flex items-center gap-2">
                            <Icon name="star" className="text-yellow-400 text-xl" />
                            <span className="font-semibold text-brand-text text-lg">{product.rating.toFixed(1)}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Icon name="timer" className="text-xl" />
                            <span className="text-brand-text text-lg">{product.prepTime} min</span>
                        </div>
                    </div>

                    <p className="text-brand-text leading-relaxed mb-8">{product.description}</p>
                    
                    <div className="mt-auto bg-brand-light p-6 rounded-lg">
                         <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
                            <p className="text-4xl font-bold text-brand-primary">${product.price.toFixed(2)}</p>
                            <div className="flex items-center gap-4">
                                <div className="flex items-center border border-brand-subtle rounded-lg">
                                    <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="h-12 w-12 text-2xl text-brand-subtle hover:bg-brand-bg transition-colors rounded-l-md">-</button>
                                    <span className="h-12 w-12 flex items-center justify-center text-xl font-bold">{quantity}</span>
                                    <button onClick={() => setQuantity(q => q + 1)} className="h-12 w-12 text-2xl text-brand-subtle hover:bg-brand-bg transition-colors rounded-r-md">+</button>
                                </div>
                                <button
                                    onClick={handleAddToCart}
                                    className="bg-brand-primary text-white h-12 px-6 rounded-lg font-bold text-lg hover:bg-opacity-80 transition-transform duration-200 active:scale-95 flex items-center gap-2"
                                >
                                    <Icon name="add_shopping_cart" />
                                    <span>Agregar</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailPage;