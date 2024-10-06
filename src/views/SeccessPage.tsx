import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { getDataClient } from "../services";

const SuccessPage = () => {  

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const paymentId = queryParams.get('payment_id');
  const preferenceId = queryParams.get('preference_id');

  useEffect(() => {
    if (paymentId && preferenceId) {
      getDataClient(paymentId, preferenceId)
    }
  }, [])

  return (
    <div className='w-full px-3 mx-auto xl:max-w-[1140px] 2xl:max-w-[1320px] py-5 md:py-14 text-center'>
      <h1 className='text-4xl font-black text-orange-600 dark:text-gray-300 mb-5'>
        ¡Gracias por tu compra!
      </h1>
      <p className='text-lg mb-8 dark:text-white'>
        Tu pedido ha sido procesado con éxito. Recibirás un correo de confirmación con los detalles de tu compra.
      </p>
      <img
        src="/img/success.jpg" // Puedes cambiar este link a una imagen relevante
        alt="Compra exitosa"
        className="w-full max-w-md mx-auto mb-10"
      />
      <Link to="/" className='bg-orange-600 text-white py-2 px-6 rounded-md hover:bg-orange-700 transition-all duration-300 uppercase font-bold'>
        Volver al Inicio
      </Link>
    </div>
  )
}

export default SuccessPage;
