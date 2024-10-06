import { useEffect } from 'react'
// import { useGuitarStore } from '../store'
import { getGuitars } from '../services'
import BannerDiscount from '../components/IndexPage/BannerDiscount'
import BannerProducts from '../components/IndexPage/BannerProducts'
import BannerCategories from '../components/IndexPage/BannerCategories'
import { useAppStore } from '../stores/useAppStore'
import CarouselFeatured from '../components/IndexPage/CarouselFeatured'


const IndexPage = () => {

  const loadGuitars = useAppStore(state => state.loadGuitars)

  useEffect(() => {
    const fetchGuitars = async () => {
      try {
        const guitars = await getGuitars();
  
        if (guitars) {
          loadGuitars(guitars);
        }
      } catch (error) {
        console.error("Error fetching guitars:", error);
      }
    };
  
    fetchGuitars();
  }, []);  
  
  return (
    <>
      <main className='w-full px-3 mx-auto xl:max-w-[1140px] 2xl:max-w-[1320px] py-5'>
        <h2 className=" text-gray-700 dark:text-gray-300 text-2xl md:text-4xl font-black mt-5">Productos Destacados</h2>

        <div className=' my-5'>
          <CarouselFeatured />
        </div>

        <BannerDiscount />

        <BannerCategories />
      </main>

      <BannerProducts />
      
    </>
  )
}

export default IndexPage