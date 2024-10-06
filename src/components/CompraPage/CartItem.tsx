import { useNavigate } from "react-router-dom"
import { XCircleIcon, MinusCircleIcon, PlusCircleIcon } from "@heroicons/react/20/solid"
import Swal from "sweetalert2"
import { Guitar } from "../../types"
import { useAppStore } from "../../stores/useAppStore"
import { formatearDinero } from "../../helpers"

type CartItemProps = {
  item: Guitar
  count: number
}

const CartItem = ({item, count} : CartItemProps) => {

  const deleteCartItem = useAppStore(state => state.deleteCartItem)
  const decrementar = useAppStore(state => state.decrementar)
  const incrementar = useAppStore(state => state.incrementar)
  const navigate = useNavigate()

  // Notificacion
  const showErrorAlert = () => {
    Swal.fire({
      title: '¡Éxito!',
      text: 'Guitarra Eliminada del Carrito 🗑️',
      icon: 'error',
      confirmButtonText: 'Cerrar'
    })
  }

  return (
    <li className=" flex py-6 border-b justify-between">
      <div className=" flex gap-2">
        <div onClick={() => navigate(`/guitarras/${item.attributes.slug}`)} className=" cursor-pointer px-6">
          <img 
            src={item.attributes.imagen.data[0].attributes.formats.small.url} 
            alt={item.attributes.imagen.data[0].attributes.formats.small.name} 
            className=" max-w-full h-auto md:w-24 md:h-auto overflow-hidden rounded-md sm:w-auto sm:h-32"
          />
        </div>
        <div className=" space-y-2 px-6">
          <h2 className=" text-2xl font-bold dark:text-slate-100">{item.attributes.nombre}</h2>
          <p className=" font-bold text-3xl dark:text-orange-400">{formatearDinero(item.attributes.precio)}</p>
          <p className=" px-2 py-1 text-white bg-black rounded-full dark:bg-white dark:text-black w-fit">{item.attributes.categoria.data.attributes.nombre}</p>
        </div>
      </div>
      <div className=" space-y-4">
        <h3 className=" text-xl dark:text-white">Cantidad</h3>
        <div className="flex gap-1 items-center justify-center">
          <button
              onClick={() => decrementar(item.id)}
              type="button"
          >
              <MinusCircleIcon className=' w-6 h-6 text-gray-700 dark:text-white'/>
          </button>
          <p className=' m-0 dark:text-white text-lg font-bold'>
              {count}
          </p>
          <button
              onClick={() => incrementar(item.id)}
              type="button"
          >
              <PlusCircleIcon className=' w-6 h-6 text-gray-700 dark:text-white'/>
          </button>
        </div>
      </div>
      <div>
        <button 
          type="button"
          onClick={() => {
            deleteCartItem(item.id)
            showErrorAlert()
          }}
        >
          <XCircleIcon className=" w-8 h-8 text-black dark:text-white" />
        </button>
      </div>
    </li>
  )
}

export default CartItem