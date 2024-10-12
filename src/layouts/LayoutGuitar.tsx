import { Outlet } from "react-router-dom"
import Header from "../components/Header"
import Footer from "../components/Footer"
import { useEffect } from "react"
// import { useGuitarStore } from "../store"
import CarouselPromos from "../components/CarouselPromos"
import { useAppStore } from "../stores/useAppStore"
import WhatsAppButton from "../components/WhatsAppButton"

export default function LayoutGuitar() {

  const toogleDarkMode = useAppStore(state => state.toogleDarkMode)

  useEffect(() => {
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (systemPrefersDark) {
      document.documentElement.classList.add('dark');
      toogleDarkMode(true)
    } else {
      document.documentElement.classList.remove('dark');
      toogleDarkMode(false)
    }
  }, [])
  
  return (
    <>
        <div className=" bg-white dark:bg-gray-900">
          <Header />

          <CarouselPromos />
          
          <Outlet />
          
          <Footer />

          <WhatsAppButton />
        </div>
    </>
  )
}