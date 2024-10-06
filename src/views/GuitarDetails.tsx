import { useEffect } from "react"
// import { useGuitarStore } from "../store"
import { getGuitarBySlug } from "../services"
import { useParams } from "react-router-dom"
import SkeletonGuitar from "../components/Skeletons/SkeletonGuitar"
import { formatearDinero } from "../helpers"
import { HeartIcon } from '@heroicons/react/20/solid'
import Swal from "sweetalert2"
import { useAppStore } from "../stores/useAppStore"


const GuitarDetails = () => {

  const guitar = useAppStore(state => state.guitar)
  const loadGuitar = useAppStore(state => state.loadGuitar)
  const addCartItem = useAppStore(state => state.addCartItem)
  const addFavoriteItem = useAppStore(state => state.addFavoriteItem)

  // Notificacion
  const showSuccessAlert = (msj : string) => {
    Swal.fire({
        title: '¡Éxito!',
        text: msj,
        icon: 'success',
        confirmButtonText: 'Confirmar'
    })
}

  const {slug} = useParams()

  useEffect(() => {

    const fetchGuitarBySlug = async () => {
      try {
        if (slug) {
          const guitar = await getGuitarBySlug(slug)
          guitar && loadGuitar(guitar)
          // return guitarState = guitar
        }
      } catch (error) {
        console.log(error);
      }
    }

    fetchGuitarBySlug()
  }, [])
  
  // console.log(guitar);
  if ( Object.values(guitar).length == 0 || guitar.attributes.slug !== slug) {
    return <SkeletonGuitar />
  }

  return (
    <main className='w-full px-3 mx-auto xl:max-w-[1140px] 2xl:max-w-[1320px] py-5 sm:py-16'>
      <div className=" grid sm:grid-cols-2 items-center">
        <div className=" mx-auto">
          <img src={guitar.attributes.imagen.data[0].attributes.formats.small.url} alt={guitar.attributes.imagen.data[0].attributes.formats.small.name} />
        </div>
        <div className=" sm:px-12">
          <div className=" flex gap-3 border-b-2 border-gray-500 pb-3 items-center">
            <h1 className=" text-3xl font-bold dark:text-gray-200">{guitar.attributes.nombre}</h1>
            <p className=" px-3 rounded-xl bg-gray-800 dark:bg-gray-600 text-white uppercase text-sm">{guitar.attributes.categoria.data.attributes.nombre}</p>
          </div>
          <div className=" py-5 border-b-2 border-gray-500 dark:text-white">
            <p>{guitar.attributes.descripcion}</p>
          </div>
          <div className=" py-10">
            <p className=" text-4xl font-bold text-orange-500 dark:text-orange-300 mb-5">{ formatearDinero(guitar.attributes.precio)}</p>
            <div className=" flex gap-10 items-center">
              <button
                type="button"
                className=" bg-gray-800 dark:bg-gray-200 hover:bg-gray-950 dark:hover:bg-gray-500 transition-all duration-300 text-white dark:text-gray-800 py-2 px-10 rounded-lg uppercase font-bold"
                onClick={() => {
                  addCartItem(guitar)
                  showSuccessAlert('Guitarra Agregada al Carrito 🛒')
                }}
              >
                Comprar
              </button>
              <button 
                type="button"
                onClick={() => addFavoriteItem(guitar)}
              >
                <HeartIcon className=" w-10 h-10 dark:fill-white dark:hover:fill-slate-200 transition-all duration-300" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default GuitarDetails