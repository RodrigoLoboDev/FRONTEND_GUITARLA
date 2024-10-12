import { Link } from "react-router-dom"

const BannerProducts = () => {
  return (
    <>
      <div className=" mt-4 text-center">
          <p className=" dark:text-white">Encuentra aquí tu próxima Guitarra</p>
          <h2 className=" dark:text-gray-200 text-orange-500 mt-2 text-5xl font-extrabold">GuitarLA</h2>
          <p className=" dark:text-white my-2 text-lg">y descubre tus habilidades en este fascinante mundo de la música</p>
          <Link
              to={'/compra'}
              className="bg-black hover:bg-gray-800 dark:bg-orange-500 hover:dark:bg-orange-700 transition-colors duration-300 rounded-md py-2 px-4 text-center text-white uppercase font-bold"
          >Comprar</Link>
      </div>
      <div className=" bg-no-repeat bg-cover h-[350px] lg:h-[450px] bg-[url('/img/slider-image.jpg')] bg-center my-5 "></div>
    </>
  )
}

export default BannerProducts