import { useEffect } from 'react'
import Guitarra from './components/Guitarra'
import Header from './components/Header'
import { useGuitarStore } from './store'
import { getGuitars } from './services'

const App = () => {

  const guitars = useGuitarStore(state => state.guitars)
  const addCartItem = useGuitarStore(state => state.addCartItem)
  const loadGuitars = useGuitarStore(state => state.loadGuitars)

  useEffect(() => {
    const fetchGuitars = async () => {
      const guitars = await getGuitars();
      if (guitars) {
          loadGuitars(guitars);
      }
  };

  fetchGuitars();
  }, [])
  
  //console.log(guitars);
  
  
  return (
    <>
      <Header />

      <main className="container-xl mt-5">
          <h2 className="text-center">Nuestra Colección</h2>

          <div className="row mt-5">

              {guitars.length > 0 ? guitars.map(guitarra => (
                <Guitarra 
                  key={guitarra.id}
                  guitarra={guitarra}
                  addCartItem={addCartItem}
                />
              )) : <div>No Hay Guitarras</div>}

          </div>
      </main>


      <footer className="bg-dark mt-5 py-5">
          <div className="container-xl">
              <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados</p>
          </div>
      </footer>
    </>
  )
}

export default App