import { useMemo } from "react";
import { Link } from "react-router-dom"
import { useAppStore } from "../../stores/useAppStore";
import InfoModal from "./InfoModal";

const BannerDiscount = () => {

  const carrito = useAppStore(state => state.carrito)
  const discountThreshold1 = useAppStore(state => state.discountThreshold1)
  const discountThreshold2 = useAppStore(state => state.discountThreshold2)
  const total = useMemo(() => carrito.reduce((totalState, item) => totalState + (item.attributes.precio * item.count), 0), [carrito])

  // Cálculo del porcentaje de progreso
  const calculateProgress = (total : number) => {
    if (total >= discountThreshold2) return 100;
    if (total >= discountThreshold1) return ((total / discountThreshold2) * 100);
    return (total / discountThreshold1) * 100;
  };

  const progress = calculateProgress(total);

  return (
    <div className="p-5 text-center sm:p-10">
      <h2 className="dark:text-gray-300 uppercase font-black text-2xl">Consigue hasta un -25%</h2>
      <h3 className="dark:text-white mt-3 font-semibold">-20% al gastar $10.000 o -25% al gastar $15.000. Usa el código de GUITARLA</h3>

      {/* Barra de Progreso */}
      <div className="w-full max-w-md mx-auto mt-5">
        <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
          <div
            className={`h-full ${progress >= 100 ? 'bg-green-500' : 'bg-orange-400'}`}
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className="mt-2 text-sm dark:text-gray-400">
          {total >= discountThreshold2
            ? "¡Felicidades! Has alcanzado el -25% de descuento."
            : total >= discountThreshold1
            ? `Te falta $${(discountThreshold2 - total).toLocaleString()} para alcanzar el -25%.`
            : `Te falta $${(discountThreshold1 - total).toLocaleString()} para alcanzar el -20%.`}
        </p>
      </div>

      {/* Botones */}
      <div className="max-w-md mx-auto flex justify-center gap-8 mt-5">
        <Link
          to={'/compra'}
          className="text-white dark:bg-orange-400 bg-black rounded-md py-1 px-3 text-center hover:dark:bg-orange-600 hover:bg-gray-900 transition-all"
        >Comprar</Link>
        <InfoModal />
      </div>
    </div>
  );
};

export default BannerDiscount;
