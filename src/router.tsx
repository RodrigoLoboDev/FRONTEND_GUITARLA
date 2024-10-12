import { createBrowserRouter } from 'react-router-dom'
import LayoutGuitar from './layouts/LayoutGuitar'
import IndexPage from './views/IndexPage'
import ErrorPage from './views/ErrorPage'
import BlogPage from './views/BlogPage'
import GuitarDetails from './views/GuitarDetails'
import BlogDetails from './views/BlogDetails'
import DescuentosPage from './views/DescuentosPage'
import CategoriesDetails from './views/CategoriesDetails'
import CompraPage from './views/CompraPage'
import FavoritesPage from './views/FavoritesPage'
import SuccessPage from './views/SeccessPage'
import FailurePage from './views/FailurePage'
import AboutUsPage from './views/AboutUsPage'
import NotFoundPage from './views/NotFoundPage'


export const router = createBrowserRouter([
    {
        path: '/',
        element: <LayoutGuitar />,
        children: [
            {
                index: true,
                element: <IndexPage />,
                errorElement: <ErrorPage />
            },
            {
                path: 'guitarras/:slug',
                element: <GuitarDetails />,
                errorElement: <ErrorPage />
            },
            {
                path: 'blog',
                element: <BlogPage />
            },
            {
                path: 'blog/:slug',
                element: <BlogDetails />,
                errorElement: <ErrorPage />
            },
            {
                path: 'descuentos',
                element: <DescuentosPage />
            },
            {
                path: 'categorias/:slug',
                element: <CategoriesDetails />,
                errorElement: <ErrorPage />
            },
            {
                path: 'compra',
                element: <CompraPage />,
                errorElement: <ErrorPage />
            },
            {
                path: 'favoritos',
                element: <FavoritesPage />,
                errorElement: <ErrorPage />
            },
            {
                path: 'success',
                element: <SuccessPage />,
                errorElement: <ErrorPage />
            },
            {
                path: 'failure',
                element: <FailurePage />,
                errorElement: <ErrorPage />
            },
            {
                path: 'nosotros',
                element: <AboutUsPage />,
                errorElement: <ErrorPage />
            },

            // Ruta de Error 404 (Not Found)
            {
              path: '*', 
              element: <NotFoundPage />
            }
        ]
    }
    // Puedo tener mas de un Layout, aqui iria el segundo Layout con la misma sintaxis de arriba
])