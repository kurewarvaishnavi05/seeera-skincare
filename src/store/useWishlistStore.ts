import { create } from 'zustand';

export interface WishlistItem {
  id: string | number;
  name: string;
  price: number;
  image: string;
  slug: string;
}

interface WishlistStore {
  items: WishlistItem[];
  addItem: (item: WishlistItem) => void;
  removeItem: (id: string | number) => void;
  hasItem: (id: string | number) => boolean;
  clearWishlist: () => void;
}

export const useWishlistStore = create<WishlistStore>((set, get) => ({
  items: [],
  addItem: (item) => set((state) => {
    if (state.items.find((i) => i.id === item.id)) {
      return state; // Already exists
    }
    return { items: [...state.items, item] };
  }),
  removeItem: (id) => set((state) => ({
    items: state.items.filter((item) => item.id !== id),
  })),
  hasItem: (id) => {
    return get().items.some((item) => item.id === id);
  },
  clearWishlist: () => set({ items: [] }),
}));
