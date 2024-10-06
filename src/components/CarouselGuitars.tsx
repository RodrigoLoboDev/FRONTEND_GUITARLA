import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import SwiperCore from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation'; // Estilos del módulo de navegación
// import { useGuitarStore } from '../store';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
import { ShoppingCartIcon, ArrowsPointingOutIcon, ArrowLeftCircleIcon, ArrowRightCircleIcon } from '@heroicons/react/20/solid'
import { Guitar } from '../types';
import { formatearDinero } from '../helpers';
import { useAppStore } from '../stores/useAppStore';



type CarouselGuitarsProps = {
    guitars: Guitar[]
    countCard: number
}

const CarouselGuitars = ({guitars, countCard} : CarouselGuitarsProps) => {

    const addCartItem = useAppStore(state => state.addCartItem)

    // Notificacion
    const showSuccessAlert = () => {
        Swal.fire({
            title: '¡Éxito!',
            text: 'Guitarra Agregada al Carrito 🛒',
            icon: 'success',
            confirmButtonText: 'Confirmar'
        })
    }

    const navigate = useNavigate()

    // Referencias para los botones personalizados
    const swiperRef = useRef<SwiperCore | null>(null); // SwiperCore tipado para TypeScript

  return (
    <div className="relative">
        <Swiper
        modules={[Navigation]}
        spaceBetween={30}
        slidesPerView={1}
        navigation={{
            prevEl: swiperRef.current?.navigation?.prevEl, // Referencia al botón de 'Prev'
            nextEl: swiperRef.current?.navigation?.nextEl, // Referencia al botón de 'Next'
        }}
        onSwiper={(swiper) => { swiperRef.current = swiper }} // Asignamos el Swiper a la ref
        loop={guitars.length > countCard}
        breakpoints={{
            // Cuando la pantalla es >= 640px (dispositivos pequeños)
            640: {
            slidesPerView: 2, // Muestra 1 card
            spaceBetween: 10,
            },
            // Cuando la pantalla es >= 768px (tablets)
            768: {
            slidesPerView: countCard, // Muestra 2 cards
            spaceBetween: 20,
            },
            // Cuando la pantalla es >= 1024px (laptops y desktops)
            1024: {
            slidesPerView: countCard, // Muestra 3 cards
            spaceBetween: 30,
            }
        }}
        >
        {guitars.map(product => (
            <SwiperSlide key={product.id}>
            <div className="border border-gray-200 rounded-lg shadow-lg overflow-hidden bg-white dark:bg-gray-900 transition-transform duration-300 hover:shadow-xl">
                <div className="relative group">

                {/* Contenido del Card */}
                <div className='flex gap-3 items-center'>
                    <div className=" w-1/3">
                    <img className=" max-w-full h-72" src={product.attributes.imagen.data[0].attributes.formats.small.url} alt={product.attributes.imagen.data[0].attributes.formats.small.name} />
                    </div>
                    <div className=" w-2/3 space-y-3">
                    <h3 className="text-black dark:text-gray-300 font-black uppercase text-2xl">{product.attributes.nombre}</h3>
                    <p className=' dark:text-white'>{product.attributes.descripcion}</p>
                    <p className=" text-orange-400 dark:text-orange-300 text-4xl font-black">{formatearDinero(product.attributes.precio)}</p>
                    </div>
                </div>
                
                {/* Mascara */}
                <div className="absolute inset-0 bg-black bg-opacity-80 flex justify-center items-center gap-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button 
                        type='button'
                        onClick={() => navigate(`/guitarras/${product.attributes.slug}`)}
                    >
                    <ArrowsPointingOutIcon className=' w-12 h-12 text-white' />
                    </button>
                    <button 
                        type='button'
                        onClick={() => {
                            addCartItem(product)
                            showSuccessAlert()
                        }}
                    >
                    <ShoppingCartIcon className=' w-12 h-12 text-white' />
                    </button>
                </div>

                </div>
            </div>
            </SwiperSlide>
        ))}
        </Swiper>

        {/* Botones personalizados */}
        <button
        typeof='button'
        onClick={() => {
            if (swiperRef.current && swiperRef.current.navigation) {
            swiperRef.current.navigation.prevEl.click();
            }
        }}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-gray-800 text-white rounded-full hover:bg-gray-600"
        >
            <ArrowLeftCircleIcon className=' w-10 h-10' />
        </button>

        <button
        typeof='button'
        onClick={() => {
            if (swiperRef.current && swiperRef.current.navigation) {
            swiperRef.current.navigation.nextEl.click();
            }
        }}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-gray-800 text-white rounded-full hover:bg-gray-600"
        >
            <ArrowRightCircleIcon className=' w-10 h-10' />
        </button>
    </div>
  )
}

export default CarouselGuitars