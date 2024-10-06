import { useMemo } from "react"
import { formatearDinero } from "../helpers"
import CartItem from "../components/CompraPage/CartItem"
import { useAppStore } from "../stores/useAppStore"

import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'
import { createPreference } from "../services"


const CompraPage = () => {

    const carrito = useAppStore(state => state.carrito)
    const loadPreferenceId = useAppStore(state => state.loadPreferenceId)
    const preferenceId = useAppStore(state => state.preferenceId)
    const total = useMemo(() => carrito.reduce((totalState, item) => totalState + (item.attributes.precio * item.count), 0), [carrito])

    initMercadoPago(import.meta.env.VITE_MERCARDOPAGO_PUBLIC_KEY, { locale: "es-AR" });

    const handleClick = async () => {

        const products = carrito.map(item => ({
            id: item.id,
            nombre: item.attributes.nombre,       
            descripcion: item.attributes.descripcion, 
            precio: item.attributes.precio,
            count: item.count
          }));        

        const order = {
            products,
            total
        }

        try {
            // Enviar productos al backend para crear la preferencia
            const response = await createPreference(order);
      
            // Cargar el preferenceId
            loadPreferenceId(response.data.preferenceId);
          } catch (error) {
            console.error('Error al crear preferencia:', error);
          }
    }

  return (
    <main className='w-full px-3 mx-auto xl:max-w-[1140px] 2xl:max-w-[1320px] py-5 md:py-14'>
        <h1 className=" mb-5 text-3xl font-bold dark:text-gray-200">Carrito de Compra</h1>
        <div className=" grid md:grid-cols-2 md:gap-20 gap-10">
            <div className=" max-w-full md:max-w-lg">
                {carrito.length == 0 && <p className=" dark:text-white mb-5">No hay Guitarras en el Carrito</p>}
                <ul>
                    {carrito.map(item => (
                        <CartItem key={item.id} item={item} count={item.count} />
                    ))}
                </ul>
            </div>
            <div className=" max-w-full md:max-w-xl">
                <div className=" p-6 rounded-lg bg-slate-100 shadow-lg">
                    <p className=" mb-3 text-lg font-semibold pb-5 border-b-4 border-slate-500">Resumen del Pedido</p>
                    <div className="flex justify-between gap-5 my-7">
                        <p>Total del Pedido: </p>
                        <p>{formatearDinero(total)}</p>
                    </div>
                    <button 
                        type="button"
                        className=" text-white bg-slate-800 dark:bg-orange-500 py-2 w-full rounded-md text-center uppercase font-bold hover:bg-slate-500 dark:hover:bg-orange-700 transition-all duration-300"
                        onClick={handleClick}
                    >
                        Comprar
                    </button>
                    
                    {preferenceId && (
                        <Wallet initialization={{ preferenceId: preferenceId }} customization={{ texts:{ valueProp: 'smart_option'}}} />
                    )}

                </div>
        </div>
        </div>
    </main>
  )
}

export default CompraPage