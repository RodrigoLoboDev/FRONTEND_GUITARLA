import FavoriteItem from "../components/FavoritesPage/FavoriteItem"
import { useAppStore } from "../stores/useAppStore"

const FavoritesPage = () => {

  const favoritesItem = useAppStore(state => state.favoritesItem)

  return (
    <main className='w-full px-3 mx-auto xl:max-w-[1140px] 2xl:max-w-[1320px] py-5 md:py-14'>
        <h1 className=" sm:text-3xl dark:text-slate-200 mb-6 font-black">Guitarras que te gustan</h1>
        <div className=" max-w-xl mx-auto w-[90%]">
          {favoritesItem.length == 0 && <p className=" py-8 dark:text-white">No hay Guitarras en la sección de Me Gusta ❤️</p>}

          <ul>
            {favoritesItem.map(item => (
              <FavoriteItem key={item.id} item={item} />
            ))}
          </ul>
        </div>
    </main>
  )
}

export default FavoritesPage