import { useEffect } from "react"
// import { useGuitarStore } from "../store"
import { Link } from "react-router-dom"
import { useAppStore } from "../../stores/useAppStore"
import { getCategories } from "../../services"
import SkeletonCategories from "../Skeletons/SkeletonCategories"

const BannerCategories = () => {

    const categories = useAppStore(state => state.categories)
    const loadCategory = useAppStore(state => state.loadCategory)

    useEffect(() => {
      const fetchCategory = async () => {
        try {
            const categories = await getCategories()

            if (categories) {
                loadCategory(categories)
            }
        } catch (error) {
            console.log(error);
        }
      }

      fetchCategory()
    }, [])
    
    // console.log(categories);
    
  return (
    <div className=" max-w-6xl py-4 mx-auto sm:py-10 sm:px-24">
        <h3 className=" dark:text-gray-200 px-6 pb-4 text-3xl sm:pb-8">Elige tu Categoría Favortita</h3>

        <div className=" grid gap-5 sm:gap-0 sm:grid-cols-2">
            {categories.length == 0 ? <SkeletonCategories /> : categories.map(category => (
                <Link
                    key={category.id}
                    to={`/categorias/${category.attributes.slug}`}
                    className=" relative max-w-sm sm:max-w-full mx-auto overflow-hidden bg-no-repeat bg-cover rounded-lg"
                >
                    <img 
                        src={category.attributes.imagen.data.attributes.formats.medium?.url} 
                        alt={category.attributes.imagen.data.attributes.formats.medium?.name} 
                        className=" max-w-full h-72 overflow-hidden transition duration-300 ease-in-out rounded-lg hover:scale-110"
                    />
                    <p className=" uppercase absolute w-full py-2 text-lg font-bold text-center text-white bottom-5 backdrop-blur-lg">{category.attributes.nombre}</p>
                </Link>
            ))}
        </div>
    </div>
  )
}

export default BannerCategories