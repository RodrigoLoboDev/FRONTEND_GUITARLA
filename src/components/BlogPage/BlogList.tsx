import { Link } from "react-router-dom"
import { Blog } from "../../types"

type BlogProps = {
    blog : Blog
}

const BlogList = ({blog} : BlogProps) => {
  return (
    <div className="blog-item border p-5 rounded-lg shadow-md">
      <img src={blog.attributes.imagen.data[0].attributes.formats.medium?.url} alt={blog.attributes.titulo} className="mb-4 w-full" />
      <h2 className=" dark:text-gray-300 text-2xl font-semibold mb-2">{blog.attributes.titulo}</h2>
      <p className="text-gray-600 dark:text-white mb-4">{blog.attributes.resumen}</p>
      <Link 
        to={`/blog/${blog.attributes.slug}`}
        className="text-orange-400 hover:underline"
      >Leer más</Link>
    </div>
  )
}

export default BlogList