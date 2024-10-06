import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { createGuitarSlice, GuitarSliceType } from "./useGuitar";
import { CartSliceType, createCartSlice } from "./useCart";
import { BlockSliceType, createBlockSlice } from "./useBlock";
import { createFavoritesSlice, FavoritesSliceType } from "./useFavorites";


export const useAppStore = create<GuitarSliceType & CartSliceType & BlockSliceType & FavoritesSliceType>()(devtools(persist((...a) => ({
    ...createGuitarSlice(...a),
    ...createCartSlice(...a),
    ...createBlockSlice(...a),
    ...createFavoritesSlice(...a)
}), {
    name: 'carrito-favorito-guitar-storage',
    partialize: (state) => ({ carrito: state.carrito, favoritesItem: state.favoritesItem }), // Solo persiste el carrito y los favoritos
})
))