import { useNavigate, useRouteError } from "react-router-dom"

type RouteError = {
  message: string
}

const ErrorPage = () => {

    const error = useRouteError() as RouteError
    const navigate = useNavigate()

  return (
    <main className="w-full px-3 mx-auto xl:max-w-[1140px] 2xl:max-w-[1320px] py-5">
      <div className="space-y-8">
          <h1 className="text-center text-6xl font-extrabold mt-20 text-orange-900 dark:text-orange-300">PAGE ERROR</h1>
          <p className="text-center text-2xl dark:text-gray-300">Hubo un error</p>
          <p className="text-center dark:text-white">{error.message}</p>
          <div className=" flex justify-center">
            <button
              type="button"
              className=" text-center text-white font-black uppercase rounded-md shadow-md bg-orange-700 dark:bg-orange-500 hover:bg-orange-900 dark:hover:bg-orange-700 transition-all py-2 px-4"
              onClick={
                () => navigate('/')
              }
            >
              Volver o Recargar
            </button>
          </div>
      </div>
    </main>
  )
}

export default ErrorPage