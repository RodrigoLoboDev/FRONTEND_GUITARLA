import 'swiper/css';
import 'swiper/css/navigation'; // Estilos del módulo de navegación
import { useEffect } from 'react';
import { useAppStore } from '../../stores/useAppStore';
import { getGuitarByIsFeatured } from '../../services';
import SkeletonFeatured from '../Skeletons/SkeletonFeatured';
import CarouselGuitars from '../CarouselGuitars';


const CarouselFeatured = () => {

  const guitarsFeatured = useAppStore(state => state.guitarsFeatured)
  const loadGuitarsFeatured = useAppStore(state => state.loadGuitarsFeatured)

  useEffect(() => {
    const fetchGuitars = async () => {
      try {
        const guitarsFeatured = await getGuitarByIsFeatured();
  
        if (guitarsFeatured) {
          loadGuitarsFeatured(guitarsFeatured);
        }
      } catch (error) {
        console.error("Error fetching guitars:", error);
      }
    };
  
    fetchGuitars();
  }, []);

  if (guitarsFeatured.length == 0) {
    return <SkeletonFeatured />;
  }

  return (
    <>
      <CarouselGuitars guitars={guitarsFeatured} countCard={3} />
    </>
  )
}

export default CarouselFeatured