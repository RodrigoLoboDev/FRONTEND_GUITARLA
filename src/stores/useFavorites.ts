import { StateCreator } from 'zustand'
import { Guitar } from "../types";
import Swal from 'sweetalert2';


// type del state
export type FavoritesSliceType = {
    favoritesItem: Guitar[]
    addFavoriteItem: (data: Guitar) => void // void no retorna nada
    deleteFavoriteItem: (id: Guitar['id']) => void
}

// Notificaciones
const showSuccessAlert = (msj : string) => {
    Swal.fire({
        title: '¡Éxito!',
        text: msj,
        icon: 'success',
        confirmButtonText: 'Confirmar'
    })
}
const showErrorAlert = (msj : string) => {
    Swal.fire({
        title: '¡Error!',
        text: msj,
        icon: 'error',
        confirmButtonText: 'Cerrar'
    })
}

// Nuestro hook
// set - para modificar el state
// get - para tomar el state
export const createFavoritesSlice : StateCreator<FavoritesSliceType> = (set, get) => ({
    favoritesItem: [],
    addFavoriteItem: (data) => {

        const { favoritesItem } = get();
        const existItem = favoritesItem.find( stateItem => stateItem.id === data.id)
        // console.log(existItem);
    
        if (existItem) {
          showErrorAlert('La Guitarra ya esta agregada a Favoritos 💔')
          return
        }

        set((state) => ({
            favoritesItem: [
                ...state.favoritesItem,
                data
            ]
        }))
        showSuccessAlert('Guitarra Agregada a Favoritos ❤️')
    },
    deleteFavoriteItem: (id) => {
      set((state) => ({
        favoritesItem: state.favoritesItem.filter((item) => item.id !== id),
      }));
    },
})