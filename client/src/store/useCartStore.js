import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useCartStore = create(
    persist(
        (set, get) => ({
            items: [],

            addItem: (product) => {
                const { items } = get();
                const existingItem = items.find((item) => item.id === product.id);

                if (existingItem) {
                    set({
                        items: items.map((item) =>
                            item.id === product.id
                                ? { ...item, quantity: item.quantity + 1 }
                                : item
                        ),
                    });
                } else {
                    set({ items: [...items, { ...product, quantity: 1 }] });
                }
            },

            updateQuantity: (id, delta) => {
                const { items } = get();
                set({
                    items: items
                        .map((item) => {
                            if (item.id === id) {
                                return { ...item, quantity: Math.max(0, item.quantity + delta) };
                            }
                            return item;
                        })
                        .filter((item) => item.quantity > 0),
                });
            },

            checkOut: () => {
                set({ items: [] });
            },

            getCartTotal: () => {
                const { items } = get();
                return items.reduce((total, item) => total + item.price * item.quantity, 0);
            },

            getCartCount: () => {
                const { items } = get();
                return items.reduce((count, item) => count + item.quantity, 0);
            }
        }),
        {
            name: 'scanimart-cart', // unique name
        }
    )
);

export default useCartStore;
