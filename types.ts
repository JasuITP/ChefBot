
export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  restaurant: string;
  prepTime: number; // in minutes
  rating: number; // out of 5
  imageUrl: string;
  category: 'Dulce' | 'Salado' | 'Bajas Calorías' | 'Asado';
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  date: string;
  customer: {
    name: string;
    email: string;
  };
}

export enum SnackbarType {
    SUCCESS = 'SUCCESS',
    ERROR = 'ERROR'
}

export interface SnackbarState {
    message: string;
    type: SnackbarType;
    isOpen: boolean;
}
