import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '@/lib/products';

export interface CartItem {
  id: string; // unique id for cart item (product_id + bundle_price)
  product: Product;
  quantity: number; // how many times this bundle is added
  bundleQuantity: number; // 1, 2, or 5
  bundlePrice: number; // 199, 279, 349
  isUpsell?: boolean;
}

export interface LastOrder {
  customerName: string;
  total: number;
  items: CartItem[];
}

interface CartStore {
  items: CartItem[];
  lastOrder: LastOrder | null;
  isOpen: boolean;
  isCheckoutOpen: boolean;
  addItem: (product: Product, bundleQuantity: number, bundlePrice: number, isUpsell?: boolean) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  setLastOrder: (order: LastOrder) => void;
  clearLastOrder: () => void;
  setIsOpen: (isOpen: boolean) => void;
  setCheckoutOpen: (isOpen: boolean) => void;
  getCartTotal: () => number;
  getCartCount: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      lastOrder: null,
      isOpen: false,
      isCheckoutOpen: false,

      addItem: (product, bundleQuantity, bundlePrice, isUpsell = false) => {
        set((state) => {
          const itemId = isUpsell ? `${product.id}-upsell-${bundlePrice}` : `${product.id}-${bundleQuantity}`;
          const existingItem = state.items.find((item) => item.id === itemId);
          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.id === itemId
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
              isOpen: true,
            };
          }
          return { 
            items: [...state.items, { id: itemId, product, quantity: 1, bundleQuantity, bundlePrice, isUpsell }], 
            isOpen: true 
          };
        });
      },

      removeItem: (itemId) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== itemId),
        }));
      },

      updateQuantity: (itemId, quantity) => {
        set((state) => ({
          items: state.items.map((item) =>
            item.id === itemId ? { ...item, quantity: Math.max(1, quantity) } : item
          ),
        }));
      },

      clearCart: () => set({ items: [] }),
      
      setLastOrder: (order) => set({ lastOrder: order }),
      clearLastOrder: () => set({ lastOrder: null }),
      
      setIsOpen: (isOpen) => set({ isOpen }),
      
      setCheckoutOpen: (isCheckoutOpen) => set({ isCheckoutOpen }),

      getCartTotal: () => {
        return get().items.reduce((total, item) => total + item.bundlePrice * item.quantity, 0);
      },

      getCartCount: () => {
        return get().items.reduce((count, item) => count + item.quantity, 0);
      },
    }),
    {
      name: 'orindalife-cart-v2',
    }
  )
);
