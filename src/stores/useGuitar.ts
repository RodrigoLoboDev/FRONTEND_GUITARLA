import { StateCreator } from 'zustand'
import { Category, Guitar, Promo } from "../types";


// type del state
export type GuitarSliceType = {
  guitars: Guitar[]
  guitarsFeatured: Guitar[]
  guitar: Guitar
  categories: Category[]
  categoryGuitar: Guitar[]
  promos: Promo[]
  darkMode: boolean
  preferenceId: string
  loadGuitars: (guitars: Guitar[]) => void 
  loadGuitarsFeatured: (guitars: Guitar[]) => void 
  loadGuitar: (guitar: Guitar) => void 
  loadCategory: (categories: Category[]) => void
  loadCategoryGuitar: (categoryGuitar: Guitar[]) => void
  loadPromo: (promos: Promo[]) => void
  toogleDarkMode: (bool : boolean) => void
  loadPreferenceId: (preferenceId: string) => void 
}

// Nuestro hook
// set - para modificar el state
// get - para tomar el state
export const createGuitarSlice : StateCreator<GuitarSliceType> = (set) => ({
  guitars: [],
  guitarsFeatured: [],
  guitar: {} as Guitar,
  categories: [],
  categoryGuitar: [],
  promos: [],
  darkMode: false,
  preferenceId: "",
  loadGuitars: (guitars) => {
    set(() => ({
      guitars
    }))
  },
  loadGuitarsFeatured: (guitarsFeatured) => {
    set(() => ({
      guitarsFeatured
    }))
  },
  loadGuitar: (guitar) => {
    set(() => ({
      guitar
    }))
  },
  loadCategory: (categories) => {
    set(() => ({
      categories
    }))
  },
  loadCategoryGuitar: (categoryGuitar) => {
    set(() => ({
      categoryGuitar
    }))
  },
  loadPromo: (promos) => {
    set(() => ({
      promos
    }))
  },
  toogleDarkMode: (bool) => {
    set(() => ({
      darkMode: bool 
    }))
  },
  loadPreferenceId: (preferenceId) => {
    set(() => ({
      preferenceId
    }))
  }
})