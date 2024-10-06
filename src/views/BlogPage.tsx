import { useEffect, useState } from "react";
import { getBlogs } from "../services";
import SkeletonBlogs from "../components/Skeletons/SkeletonBlogs";
import { useAppStore } from "../stores/useAppStore";
import BlogList from "../components/BlogPage/BlogList";

const BlogPage = () => {

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const loadBlogs = useAppStore(state => state.loadBlogs)
  const blogs = useAppStore(state => state.blogs)

  useEffect(() => {
    const fetchBlogs = async () => {
      const blogs = await getBlogs(currentPage);
      // console.log(blogs);
      if (blogs?.data) {
        loadBlogs(blogs.data);
        setTotalPages(blogs.meta.pagination.pageCount);
      }
  };

  fetchBlogs();
  }, [currentPage])

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  

  return (
    <>
      <main className="w-full px-3 mx-auto xl:max-w-[1140px] 2xl:max-w-[1320px] py-5">
        <h2 className="text-center text-orange-400 dark:text-orange-300 text-4xl md:text-6xl font-black">Blogs</h2>

        {blogs.length == 0 ? <SkeletonBlogs /> : (
          <div className=" grid grid-cols-1 md:grid-cols-3 gap-7 mt-5">

              {blogs.length > 0 ? blogs.map(blog => (
                <BlogList 
                  key={blog.id}
                  blog={blog}
                />
              )) : <div>No Hay Blogs</div>}

          </div>
        )}
        
        {/* Paginación */}
        <div className=" flex justify-between mt-8">
          <button 
            onClick={handlePreviousPage} 
            disabled={currentPage === 1}
            className="bg-gray-300 px-4 py-2 rounded disabled:opacity-50"
          >
            Anterior
          </button>
          <span className=" dark:text-white">Página {currentPage} de {totalPages}</span>
          <button 
            onClick={handleNextPage} 
            disabled={currentPage === totalPages}
            className="bg-gray-300 px-4 py-2 rounded disabled:opacity-50"
          >
            Siguiente
          </button>
        </div>
      </main>
    </>
  )
}

export default BlogPage