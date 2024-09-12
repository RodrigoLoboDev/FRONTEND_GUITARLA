import { useState, useEffect } from 'react'
import { db } from '../data/db';

import type { Guitar, Carrito } from '../types';

export const useCarrito = () => {

    const inicial = () : Carrito[] => {
      const localStorageCarrito = localStorage.getItem('carrito')
      return localStorageCarrito ? JSON.parse(localStorageCarrito) : []
    }

    const [guitarras] = useState(db)
    const [carrito, setCarrito] = useState(inicial)
    const [total, setTotal] = useState(0)
  
    
    // useEffect(() => {
    //   setGuitarras(db)
    // }, [])
  
    useEffect(() => {
  
      const nuevoTotal = carrito.reduce((stateTotal, item) => stateTotal += (item.price * item.count), 0)
  
      setTotal(nuevoTotal)
  
      localStorage.setItem('carrito', JSON.stringify(carrito))
  
    }, [carrito])
  
    const addCarrito = (item : Guitar) => {
      // console.log(item);
      // return;
  
      const existItem = carrito.findIndex( stateItem => stateItem.id === item.id)
      // console.log(existItem);
  
      if (existItem < 0) {
        setCarrito([
          ...carrito, {
            ...item,
            count: 1
          }
        ])
        return
      }
  
      const carritoActualizado = carrito.map(stateItem => {
        if (stateItem.id === item.id) {
          stateItem.count++
          return stateItem
        }
        return stateItem
      })
  
     setCarrito(carritoActualizado)
  
    }
  
    const incrementar = (id : Guitar['id']) => {
      // console.log(id);
  
      const carritoActualizado = carrito.map(stateItem => {
        if (stateItem.id === id && stateItem.count < 5) {
          stateItem.count++
          return stateItem
        }
        return stateItem
      })
  
      setCarrito(carritoActualizado)
    }
  
    const decrementar = (id : Guitar['id']) => {
      // console.log(id);
  
      const carritoActualizado = carrito.map(stateItem => {
        if (stateItem.id === id && stateItem.count > 1) {
          stateItem.count--
          return stateItem
        }
        return stateItem
      })
  
      setCarrito(carritoActualizado)
    }
  
    const eliminarItem = (id : Guitar['id']) => {
      // console.log(id);
  
      const carritoActualizado = carrito.filter(stateItem => stateItem.id !== id)
  
      setCarrito(carritoActualizado)
    }
  
    const vaciarCarrito = () => {
      setCarrito([])
    }

    return {
        carrito,
        incrementar,
        decrementar,
        eliminarItem,
        vaciarCarrito,
        total,
        guitarras,
        addCarrito
    }

}