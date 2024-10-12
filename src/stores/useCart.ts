import { StateCreator } from 'zustand'
import { CartItem, Guitar } from "../types";


// type del state
export type CartSliceType = {
    carrito: CartItem[]
    discountThreshold1: number
    discountThreshold2: number
    addCartItem: (data: Guitar) => void // void no retorna nada
    incrementar: (id: Guitar['id']) => void
    decrementar: (id: Guitar['id']) => void
    deleteCartItem: (id: Guitar['id']) => void
    vaciarCartItem: () => void
}

// Nuestro hook
// set - para modificar el state
// get - para tomar el state
export const createCartSlice : StateCreator<CartSliceType> = (set, get) => ({
    carrito: [],
    discountThreshold1: 10000,
    discountThreshold2: 15000,
    addCartItem: (data) => {

        const { carrito } = get();
        const existItem = carrito.findIndex( stateItem => stateItem.id === data.id)
        // console.log(existItem);

        const newGuitar = {
            ...data,
            count: 1
        }
    
        if (existItem < 0) {
            set((state) => ({
                carrito: [
                    ...state.carrito,
                    newGuitar
                ]
            })) 
          return
        }
    
        const carritoActualizado = carrito.map(stateItem => {
          if (stateItem.id === data.id) {
            stateItem.count++
            return stateItem
          }
          return stateItem
        })

        set(() => ({
            carrito: carritoActualizado
        }))    
    },
    incrementar: (id) => {
      set((state) => ({
        carrito: state.carrito.map((item) =>
          item.id === id ? { ...item, count: item.count + 1 } : item
        ),
      }));
    },
    decrementar: (id) => {
      set((state) => ({
        carrito: state.carrito.map((item) =>
          item.id === id && item.count > 1
            ? { ...item, count: item.count - 1 }
            : item
        ),
      }));
    },
    deleteCartItem: (id) => {
      set((state) => ({
        carrito: state.carrito.filter((item) => item.id !== id),
      }));
    },
    vaciarCartItem: () => {
      set(() => ({
        carrito: [],
      }));
    },
})