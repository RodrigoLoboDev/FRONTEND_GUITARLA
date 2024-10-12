import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import { Link, useLocation } from 'react-router-dom';
// import { useGuitarStore } from '../store';
import { useEffect } from 'react';
import { getPromos } from '../services';
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/20/solid'
import 'swiper/css';
import 'swiper/css/autoplay';
import SkeletonPromos from './Skeletons/SkeletonPromos';
import { useAppStore } from '../stores/useAppStore';


const CarouselPromos = () => {

    const promos = useAppStore(state => state.promos)
    const loadPromo = useAppStore(state => state.loadPromo)

    const location = useLocation()

    useEffect(() => {
      const fetchPromo = async () => {
        try {
          const promos = await getPromos()
          
          if (promos) {
            loadPromo(promos)
          }
        } catch (error) {
          console.log(error);
        }
      }

      fetchPromo()
    }, []) 

  return (
    <>
        {location.pathname == '/' && (
            <div className="relative w-full h-36 md:h-28 p-2 bg-gray-200 dark:bg-gray-800 shadow-lg overflow-hidden mt-2 border-y border-gray-300 dark:border-gray-700">
                {promos.length == 0 ? <SkeletonPromos /> : (
                  <Swiper
                  modules={[Autoplay]}  // Aquí es donde se incluye el módulo de Autoplay
                  spaceBetween={30}
                  slidesPerView={1}
                  autoplay={{ delay: 4000, disableOnInteraction: false }} // Configuración del autoplay
                  loop={true}  // Para que el carrusel sea continuo
                  className="h-full container mx-auto max-w-[95%]"
                  >
                    {promos.map(promo => (
                        <SwiperSlide key={promo.id}>
                        <div className="flex justify-center items-center h-full">
                            <div className=' '>
                              <img className=' max-w-full h-auto' src={promo.attributes.imagen.data.attributes.formats.thumbnail.url} alt={promo.attributes.imagen.data.attributes.formats.thumbnail.name} />
                            </div>
                            <div>
                              <div className=' flex gap-10 items-center justify-center'>
                                <h2 className="text-base font-bold mb-1 dark:text-gray-300">{promo.attributes.nombre}</h2>
                                <Link 
                                  to={'/descuentos'}
                                >
                                  <ArrowTopRightOnSquareIcon className=' w-8 h-8 dark:text-white' />
                                </Link>
                              </div>
                              <p className="text-sm dark:text-white text-center">{promo.attributes.descripcion}</p>
                            </div>
                        </div>
                        </SwiperSlide>
                    ))}
                  </Swiper>
                )}
            </div>
        )}
    </>
  )
}

export default CarouselPromos