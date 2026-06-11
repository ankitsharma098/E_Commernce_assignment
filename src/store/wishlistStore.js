import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useWishlistStore = create(
  persist(
    (set, get) => ({
      items: [],

      toggleWishlist: (product) => {
        const { items } = get();
        const exists = items.find((i) => i.id === product.id);
        if (exists) {
          set({ items: items.filter((i) => i.id !== product.id) });
        } else {
          set({ items: [...items, product] });
        }
      },

      removeFromWishlist: (productId) => {
        set({ items: get().items.filter((i) => i.id !== productId) });
      },

      isWishlisted: (productId) =>
        get().items.some((i) => i.id === productId),

      clearWishlist: () => set({ items: [] }),
    }),
    { name: 'shopvibe-wishlist' }
  )
);

export default useWishlistStore;
