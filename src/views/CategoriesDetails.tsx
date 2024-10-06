import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { getCategoryBySlug } from "../services";
// import { useGuitarStore } from "../store";
import CarouselGuitars from "../components/CarouselGuitars";
import SkeletonFeatured from "../components/Skeletons/SkeletonFeatured";
import { useAppStore } from "../stores/useAppStore";

const CategoriesDetails = () => {

    const categoryGuitar = useAppStore(state => state.categoryGuitar)
    const loadCategoryGuitar = useAppStore(state => state.loadCategoryGuitar)

    const [categoria, setCategoria] = useState('')
    const [noCategoryGuitar, setnoCategoryGuitar] = useState(false)

    const navigate = useNavigate()
    const {slug} = useParams()
    
    const slugParams = useMemo( () => slug ? slug : '', [slug])

    useEffect(() => {
      const fetchCategorySlug = async () => {
        try {
            setnoCategoryGuitar(false)
            setCategoria(slugParams)
            const data = await getCategoryBySlug(slugParams)

            data && data.length > 0 ? loadCategoryGuitar(data) : setnoCategoryGuitar(true)
            
        } catch (error) {
            console.log(error);            
        }
      }

      fetchCategorySlug()
    }, [slugParams])
    

    const handleChange = async (e : React.ChangeEvent<HTMLInputElement>) => {
        navigate(`/categorias/${e.target.value}`)
    }   

  return (
    <main className="w-full px-3 mx-auto xl:max-w-[1140px] 2xl:max-w-[1320px] py-10">
        <h1 className=" dark:text-gray-300 text-3xl border-b border-gray-900 dark:border-gray-300">Guitarras <span className=" uppercase font-black dark:text-white">{slug}</span></h1>

        <div className=" flex flex-col md:flex-row mt-5 items-center">
            <div className=" w-1/3">
                <h2 className=" dark:text-gray-200 font-bold text-3xl mb-5">Categorias</h2>
                <form action="">
                    <fieldset className=" flex flex-col gap-3">
                        <label htmlFor="electricas" className=" flex gap-2 items-center">
                            <input 
                                type="radio" 
                                name="categoria" 
                                id="electricas" 
                                value={'electricas'} 
                                checked={categoria === 'electricas'}
                                onChange={handleChange}
                            />
                            <p className=" text-xl dark:text-white text-gray-700 font-semibold">Electricas</p>
                        </label>
                        <label htmlFor="acusticas" className=" flex gap-2 items-center">
                            <input 
                                type="radio" 
                                name="categoria" 
                                id="acusticas" 
                                value={'acusticas'} 
                                checked={categoria === 'acusticas'}
                                onChange={handleChange}
                            />
                            <p className=" text-xl dark:text-white text-gray-700 font-semibold">Acusticas</p>
                        </label>
                    </fieldset>
                </form>
            </div>
            <div className=" w-2/3">
                {categoryGuitar.length == 0 ? <SkeletonFeatured /> : noCategoryGuitar ? <p className=" dark:text-white">No Hay Guitarras en esta Categoria</p> : <CarouselGuitars guitars={categoryGuitar} countCard={2} />}
            </div>
        </div>
    </main>
  )
}

export default CategoriesDetails