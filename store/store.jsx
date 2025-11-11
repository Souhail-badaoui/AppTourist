// app/store.js
import { create } from "zustand";

export const useFavoritesStore = create((set) => ({
  favorites: [],
  selectedAttraction: null,

  toggleFavorite: (item) =>
    set((state) => ({
      favorites: state.favorites.find((fav) => fav.id === item.id)
        ? state.favorites.filter((fav) => fav.id !== item.id)
        : [...state.favorites, item],
    })),

  setSelectedAttraction: (attraction) => set({ selectedAttraction: attraction }),
}));
