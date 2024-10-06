import { useNavigate } from "react-router-dom"
import { XCircleIcon } from "@heroicons/react/20/solid"
import Swal from "sweetalert2"
import { Guitar } from "../../types"
import { useAppStore } from "../../stores/useAppStore"
import { formatearDinero } from "../../helpers"

type FavoriteItemProps = {
    item: Guitar
}

const FavoriteItem = ({item} : FavoriteItemProps) => {

    const deleteFavoriteItem = useAppStore(state => state.deleteFavoriteItem)
    const addCartItem = useAppStore(state => state.addCartItem)
    const navigate = useNavigate()

    // Notificaciones
    const showErrorAlert = (msj : string) => {
        Swal.fire({
            title: '¡Error!',
            text: msj,
            icon: 'error',
            confirmButtonText: 'Cerrar'
        })
    }
    const showSuccessAlert = (msj : string) => {
        Swal.fire({
            title: '¡Éxito!',
            text: msj,
            icon: 'success',
            confirmButtonText: 'Confirmar'
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
        <div className=" space-y-4 px-6">
          <h2 className=" text-2xl font-bold dark:text-slate-100">{item.attributes.nombre}</h2>
          <p className=" font-bold text-3xl dark:text-orange-400">{formatearDinero(item.attributes.precio)}</p>
          <p className=" px-2 py-1 text-white bg-black rounded-full dark:bg-white dark:text-black w-fit">{item.attributes.categoria.data.attributes.nombre}</p>
          <button 
            type="button"
            className=" text-white bg-slate-600 hover:bg-slate-700 transition-all duration-300 rounded-md py-2 px-8 font-bold"
            onClick={() => {
                addCartItem(item)
                deleteFavoriteItem(item.id)
                showSuccessAlert('Guitarra agregada al carrito correctamente')
            }}
            >
            Añadir al carrito
          </button>
        </div>
      </div>
      
      <div>
        <button 
          type="button"
          onClick={() => {
            deleteFavoriteItem(item.id)
            showErrorAlert('Guitarra Eliminada de Favoritos 💔')
          }}
        >
          <XCircleIcon className=" w-10 h-10 text-black dark:text-white" />
        </button>
      </div>
    </li>
  )
}

export default FavoriteItem