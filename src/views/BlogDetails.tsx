import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getBlogBySlug, getReviewByStatusAndBlogID } from "../services";
import { formatearFecha } from "../helpers";
import SkeletonBlog from "../components/Skeletons/SkeletonBlog";
import { useAppStore } from "../stores/useAppStore";
import ContentModal from "../components/BlogPage/contentModal";
import ReviewList from "../components/BlogPage/ReviewList";
import SkeletonListReview from "../components/Skeletons/SkeletonListReview";


const BlogDetails = () => {

  const [loading, setLoading] = useState(true);  // Estado para controlar el skeleton
  const [error, setError] = useState(false);     // Estado para manejar errores
  const [emptyData, setEmptyData] = useState(false); // Estado para manejar si no hay datos

  const { slug } = useParams<{ slug: string }>();
  const loadBlog = useAppStore(state => state.loadBlog)
  const blog = useAppStore(state => state.blog)
  const loadReview = useAppStore(state => state.loadReview)
  const reviews = useAppStore(state => state.reviews)
  

  useEffect(() => {
    loadReview([])
    const fetchBlogAndReviews  = async () => {
      try {
        setLoading(true); // Comienza mostrando el skeleton
        if (!slug) return;
        // Obtener el blog por slug
        const blogResult = await getBlogBySlug(slug);
        if (blogResult && blogResult.length > 0) {
          const blog = blogResult[0];
          loadBlog(blog); // Cargar el blog en el estado

          // Después de cargar el blog, obtener las reviews asociadas
          const reviewResult = await getReviewByStatusAndBlogID(blog.id);
          if (reviewResult && reviewResult.length > 0) {            
            loadReview(reviewResult); // Cargar las reviews
            setEmptyData(false); // Hay datos, no está vacío
          } else {
            setEmptyData(true);  // No hay datos disponibles
          }
        }
      } catch (error) {
        console.log(error);
        setError(true); // Si ocurre un error, lo manejamos
      } finally {
        setLoading(false); // Finaliza el estado de carga
      }
    }

    fetchBlogAndReviews()
  }, [slug])
  
  return (
    <main className="w-full px-3 mx-auto xl:max-w-[1140px] 2xl:max-w-[1320px] py-5">
      <div className="blog-detail-container w-full max-w-4xl mx-auto my-10">
        {Object.values(blog).length == 0 ? <SkeletonBlog /> : (
          <>
            <h1 className="text-4xl font-bold mb-6 dark:text-gray-300">{blog.attributes.titulo}</h1>
            <img src={blog.attributes.imagen.data[0].attributes.formats.medium?.url} alt={blog.attributes.titulo} className="mb-6 w-full" />
            {blog.attributes.contenido.map( texto => (
              <p className=" dark:text-white" key={texto.children[0].text}>{texto.children[0].text}</p>
            ))}
            <p className="text-gray-500 dark:text-gray-200 mt-6 font-black">Publicado el {formatearFecha(blog.attributes.fecha)}</p>
          </>
        )}

        {/* Comentarios */}
        <h2 className="text-3xl font-bold text-center text-orange-400 my-8">Comentarios</h2>
        {/* Mostrar el skeleton mientras está cargando */}
        {loading && <SkeletonListReview />}

        {/* Si hubo un error, mostrar un mensaje de error */}
        {error && <p className="text-center text-red-500">Hubo un error al cargar los blogs.</p>}

        {/* Si no hay datos, mostrar un mensaje */}
        {!loading && emptyData && <p className="text-center text-gray-500 dark:text-gray-400">No hay comentarios disponibles.</p>}

        {/* Si hay datos, renderizar el componente con los blogs */}
        {!loading && !emptyData && reviews.length > 0 && <ReviewList reviews={reviews} />}

        {/* Añade un comentario nuevo */}
        <ContentModal postId={blog.id} />
      </div>

    </main>
  )
}

export default BlogDetails