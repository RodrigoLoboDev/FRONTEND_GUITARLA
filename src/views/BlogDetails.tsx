import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getBlogBySlug } from "../services";
// import { useGuitarStore } from "../store";
import { formatearFecha } from "../helpers";
import SkeletonBlog from "../components/Skeletons/SkeletonBlog";
import { useAppStore } from "../stores/useAppStore";


const BlogDetails = () => {

  const { slug } = useParams<{ slug: string }>();
  const loadBlog = useAppStore(state => state.loadBlog)
  const blog = useAppStore(state => state.blog)
  

  useEffect(() => {
    const fetchBlog = async () => {
      if (slug) {
        const result = await getBlogBySlug(slug)
        if (result) {
          // console.log(result[0]);
          loadBlog(result[0])
        }
      }
    }
    fetchBlog()
  }, [])
  
  // console.log(blog);
  
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
      </div>
    </main>
  )
}

export default BlogDetails