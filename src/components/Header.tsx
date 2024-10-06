import { Link, useNavigate } from "react-router-dom"
import Navegacion from "./Navegacion"
import NavegacionMobile from "./NavegacionMobile"
import DarkMode from "./DarkMode"
import { ShoppingBagIcon, HeartIcon } from "@heroicons/react/20/solid"
import { useMemo } from "react"
import { useAppStore } from "../stores/useAppStore"

const Header = () => {

    const carrito = useAppStore(state => state.carrito)
    const countItemCart = useMemo(() => carrito.length, [carrito])

    const navigate = useNavigate()

  return (
    <header className="bg-guitar bg-cover bg-center h-auto md:h-[10rem] lg:h-[15rem] inset-0">
        <div className='bg-black bg-opacity-70 w-full h-full'>
            <div className=" py-5 container mx-auto w-[95%]">
                <div className="flex justify-between items-center md:items-end flex-col md:flex-row gap-5">
                    <div className=" w-3/4 md:w-2/3">
                        <Link to={'/'}>
                            <img className="max-w-full h-auto" src="/img/logo.svg" alt="imagen logo" />
                        </Link>
                    </div>
                    
                    <div className="w-full flex justify-end gap-5 items-center">
                        <Navegacion />

                        <div className=" w-full flex justify-end items-center md:hidden">
                            <NavegacionMobile />
                        </div>

                        <div className=" flex gap-1 cursor-pointer" onClick={() => navigate('/compra')}>
                            <ShoppingBagIcon className='w-8 h-8 text-white ' />
                            {countItemCart > 0 && <p className=' text-white'>{countItemCart}</p>}
                        </div>

                        <button 
                            type="button"
                            onClick={() => navigate('/favoritos')}
                        >
                            <HeartIcon className=" w-10 h-10 text-white" />
                        </button>
                        
                        <DarkMode />
                    </div>
                </div>
            </div>
        </div>
    </header>
  )
}

export default Header