// app/store.js
import { create } from "zustand";

export const useFavoritesStore = create((set) => ({
  favorites: [],
  selectedAttraction: null,

  toggleFavorite: (id) =>
    set((state) => ({
      favorites: state.favorites.includes(id)
        ? state.favorites.filter((fav) => fav !== id)
        : [...state.favorites, id],
    })),

  setSelectedAttraction: (attraction) => set({ selectedAttraction: attraction }),
}));
