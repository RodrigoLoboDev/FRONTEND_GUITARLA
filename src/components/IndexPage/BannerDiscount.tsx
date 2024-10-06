import { Link } from "react-router-dom"

const BannerDiscount = () => {
  return (
    <div className=" p-5 text-center sm:p-10">
        <h2 className=" dark:text-gray-300 uppercase font-black text-2xl">Consigue hasta un -25%</h2>
        <h3 className=" dark:text-white mt-3 font-semibold">-20% al gastar $300.000 o -25% al gastar $350.000. Usa el código de GUITARLA</h3>
        <div className=" max-w-md mx-auto flex justify-center gap-8 mt-5">
            <Link
                to={''}
                className=" text-white dark:bg-orange-400 bg-black rounded-md py-1 px-3 text-center hover:dark:bg-orange-600 hover:bg-gray-900 transition-all"
            >Comprar</Link>
            <Link
                to={''}
                className=" bg-gray-400 rounded-md py-1 px-3 text-center hover:bg-gray-200 transition-all"
            >Más Información</Link>
        </div>
    </div>
  )
}

export default BannerDiscount