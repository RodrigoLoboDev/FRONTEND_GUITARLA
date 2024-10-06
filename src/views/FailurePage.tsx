import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { getDataClient } from "../services";

const FailurePage = () => {  

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
      <h1 className='text-4xl font-black text-red-600 dark:text-gray-300 mb-5'>
        ¡Lo sentimos, tu pago fue rechazado!
      </h1>
      <p className='text-lg mb-8 dark:text-white'>
        No pudimos procesar tu pago. Por favor, revisa los detalles de tu tarjeta o intenta con otro método de pago.
      </p>
      <img
        src="/img/failure.jpg"  // Cambia este link a una imagen relevante de fallo
        alt="Pago rechazado"
        className="w-full max-w-md mx-auto mb-10"
      />
      <Link to="/checkout" className='bg-red-600 text-white py-2 px-6 rounded-md hover:bg-red-700 transition-all duration-300 uppercase font-bold'>
        Intentar de Nuevo
      </Link>
      <p className='mt-5 dark:text-white'>
        Si el problema persiste, puedes <Link to="/contact" className="underline text-blue-500">contactarnos</Link> para obtener ayuda.
      </p>
    </div>
  );
}

export default FailurePage;
