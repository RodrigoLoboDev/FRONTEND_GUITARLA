import { useMemo } from "react"
import { formatearDinero } from "../helpers"
import CartItem from "../components/CompraPage/CartItem"
import { useAppStore } from "../stores/useAppStore"

import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'
import { createPreference } from "../services"


const CompraPage = () => {

    const carrito = useAppStore(state => state.carrito)
    const discountThreshold1 = useAppStore(state => state.discountThreshold1)
    const discountThreshold2 = useAppStore(state => state.discountThreshold2)
    const loadPreferenceId = useAppStore(state => state.loadPreferenceId)
    const preferenceId = useAppStore(state => state.preferenceId)

    const subtotal = useMemo(() => carrito.reduce((totalState, item) => totalState + (item.attributes.precio * item.count), 0), [carrito])
    
    const total = useMemo(() => subtotal >= discountThreshold2 ? subtotal * 0.75 : subtotal >= discountThreshold1 ? subtotal * 0.80 : subtotal, [subtotal])

    const descuentoAplicado = useMemo(() => subtotal >= discountThreshold2 ? 25 : subtotal >= discountThreshold1 ? 20 : 0, [subtotal])

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

    // Cálculo del porcentaje de progreso
    const calculateProgress = (total : number) => {
        if (total >= discountThreshold2) return 100;
        if (total >= discountThreshold1) return ((total / discountThreshold2) * 100);
        return (total / discountThreshold1) * 100;
    };

    const progress = calculateProgress(total);

  return (
    <main className='w-full px-3 mx-auto xl:max-w-[1140px] 2xl:max-w-[1320px] py-5 md:py-14'>
        <h1 className=" mb-5 text-3xl font-bold dark:text-gray-200">Carrito de Compra</h1>

        {/* Barra de Progreso */}
        <div className="w-full mx-auto my-5">
            <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
            <div
                className={`h-full ${progress >= 100 ? 'bg-green-500' : 'bg-orange-400'}`}
                style={{ width: `${progress}%` }}
            ></div>
            </div>
            <p className="mt-2 text-center text-sm dark:text-gray-400">
            {total >= discountThreshold2
                ? "¡Felicidades! Has alcanzado el -25% de descuento."
                : total >= discountThreshold1
                ? `Te falta $${(discountThreshold2 - total).toLocaleString()} para alcanzar el -25%.`
                : `Te falta $${(discountThreshold1 - total).toLocaleString()} para alcanzar el -20%.`}
            </p>
        </div>

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
                        <p>Descuento Aplicado: </p>
                        <p className=" font-bold text-orange-500 text-lg">{descuentoAplicado}%</p>
                    </div>
                    <div className="flex justify-between gap-5 my-7">
                        <p>Subtotal del Pedido: </p>
                        <p>{formatearDinero(subtotal)}</p>
                    </div>
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