import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CartItem, DeliveryAddressData } from '../types';
import { DELIVERY_AREAS, DeliveryArea } from '../data/deliveryAreas';
import { getFoodImage } from '../utils/foodImages';

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: {
    menuItemId: string;
    name: string;
    category: string;
    price: number;
    variantLabel?: string;
    description?: string;
    image?: string;
  }, quantity?: number) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
  setQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  
  // Delivery calculation state
  deliveryArea: DeliveryArea;
  setDeliveryArea: (area: DeliveryArea) => void;
  deliveryAddress: DeliveryAddressData;
  setDeliveryAddress: (address: DeliveryAddressData) => void;
  
  // Discount & Promo
  promoCode: string;
  discountAmount: number;
  promoError: string | null;
  promoSuccess: string | null;
  applyPromoCode: (code: string) => boolean;
  removePromoCode: () => void;

  // Cart Totals & Minimum Rule
  minimumOrderAmount: number; // Tk 500
  subtotal: number;
  deliveryCharge: number;
  discount: number;
  total: number;
  totalItemCount: number;
  isMinimumReached: boolean;
  shortageAmount: number;

  // Navigation View State
  currentView: 'home' | 'cart';
  setCurrentView: (view: 'home' | 'cart') => void;
  navigateToCart: () => void;
  navigateToHome: () => void;

  // Notification Toast
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const MINIMUM_ORDER_AMOUNT = 500; // Tk 500 minimum order requirement

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Load initial cart from localStorage if available, otherwise default to empty
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('burger_lab_cart_items');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          return parsed;
        }
      }
    } catch {
      // ignore
    }
    return [];
  });

  const [deliveryArea, setDeliveryArea] = useState<DeliveryArea>(DELIVERY_AREAS[0]);
  const [deliveryAddress, setDeliveryAddress] = useState<DeliveryAddressData>({
    areaId: DELIVERY_AREAS[0].id,
    areaName: DELIVERY_AREAS[0].name,
    city: 'Dhaka',
    address: '',
    postcode: '',
  });

  const [promoCode, setPromoCode] = useState<string>('');
  const [discountAmount, setDiscountAmount] = useState<number>(0);
  const [promoError, setPromoError] = useState<string | null>(null);
  const [promoSuccess, setPromoSuccess] = useState<string | null>(null);

  const [currentView, setCurrentView] = useState<'home' | 'cart'>('home');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('burger_lab_cart_items', JSON.stringify(cartItems));
    } catch {
      // ignore
    }
  }, [cartItems]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 3200);
  };

  const addToCart = (
    item: {
      menuItemId: string;
      name: string;
      category: string;
      price: number;
      variantLabel?: string;
      description?: string;
      image?: string;
    },
    quantity: number = 1
  ) => {
    const itemUniqueId = item.variantLabel
      ? `${item.menuItemId}-${item.variantLabel.toLowerCase().replace(/[^a-z0-9]/g, '')}`
      : item.menuItemId;

    setCartItems((prevItems) => {
      const existingIndex = prevItems.findIndex((i) => i.id === itemUniqueId);
      if (existingIndex > -1) {
        const updated = [...prevItems];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity,
        };
        return updated;
      } else {
        const newItem: CartItem = {
          id: itemUniqueId,
          menuItemId: item.menuItemId,
          name: item.name,
          category: item.category,
          variantLabel: item.variantLabel,
          price: item.price,
          quantity: Math.max(1, quantity),
          image: item.image || getFoodImage(item.menuItemId, item.category),
          description: item.description,
        };
        return [...prevItems, newItem];
      }
    });

    showToast(`Added ${item.name} (${item.variantLabel || 'Standard'}) to cart!`);
  };

  const removeFromCart = (id: string) => {
    const targetItem = cartItems.find((i) => i.id === id);
    setCartItems((prev) => prev.filter((i) => i.id !== id));
    if (targetItem) {
      showToast(`Removed "${targetItem.name}" from cart.`);
    }
  };

  const updateQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const nextQty = item.quantity + delta;
          return {
            ...item,
            quantity: Math.max(1, nextQty),
          };
        }
        return item;
      })
    );
  };

  const setQuantity = (id: string, quantity: number) => {
    const validQty = Math.max(1, Math.floor(quantity) || 1);
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: validQty } : item))
    );
  };

  const clearCart = () => {
    setCartItems([]);
    showToast('Cart cleared.');
  };

  // Promo code validation
  const applyPromoCode = (code: string): boolean => {
    const cleanCode = code.trim().toUpperCase();
    setPromoError(null);
    setPromoSuccess(null);

    if (!cleanCode) {
      setPromoError('Please enter a coupon or promo code.');
      return false;
    }

    if (cleanCode === 'BURGERLAB10' || cleanCode === 'LAB10') {
      const discount = Math.round(subtotal * 0.10);
      setPromoCode(cleanCode);
      setDiscountAmount(discount);
      setPromoSuccess('10% Burger Lab Promo Applied!');
      showToast('Promo code applied: 10% discount!');
      return true;
    } else if (cleanCode === 'FREEDELIVERY' || cleanCode === 'FREESHIP') {
      setPromoCode(cleanCode);
      setDiscountAmount(deliveryArea.charge);
      setPromoSuccess('Free Delivery Voucher Applied!');
      showToast('Free delivery coupon applied!');
      return true;
    } else if (cleanCode === 'TASTY50') {
      setPromoCode(cleanCode);
      setDiscountAmount(50);
      setPromoSuccess('Tk 50 Off Voucher Applied!');
      showToast('Tk 50 discount coupon applied!');
      return true;
    } else {
      setPromoError('Invalid coupon code. Try "BURGERLAB10" or "TASTY50".');
      return false;
    }
  };

  const removePromoCode = () => {
    setPromoCode('');
    setDiscountAmount(0);
    setPromoError(null);
    setPromoSuccess(null);
    showToast('Coupon code removed.');
  };

  // Calculations
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryCharge = cartItems.length > 0 ? deliveryArea.charge : 0;
  const discount = Math.min(discountAmount, subtotal);
  const total = Math.max(0, subtotal + deliveryCharge - discount);
  const totalItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const isMinimumReached = subtotal >= MINIMUM_ORDER_AMOUNT;
  const shortageAmount = Math.max(0, MINIMUM_ORDER_AMOUNT - subtotal);

  const navigateToCart = () => {
    setCurrentView('cart');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToHome = () => {
    setCurrentView('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        setQuantity,
        clearCart,
        deliveryArea,
        setDeliveryArea,
        deliveryAddress,
        setDeliveryAddress,
        promoCode,
        discountAmount,
        promoError,
        promoSuccess,
        applyPromoCode,
        removePromoCode,
        minimumOrderAmount: MINIMUM_ORDER_AMOUNT,
        subtotal,
        deliveryCharge,
        discount,
        total,
        totalItemCount,
        isMinimumReached,
        shortageAmount,
        currentView,
        setCurrentView,
        navigateToCart,
        navigateToHome,
        toastMessage,
        showToast,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
