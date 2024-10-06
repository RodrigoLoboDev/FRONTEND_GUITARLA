import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'


const SkeletonBlog = () => {
  return (
    <div className="blog-detail-container w-full max-w-4xl mx-auto my-10">
        <h1 className="text-4xl font-bold mb-3 dark:text-gray-300"><Skeleton /></h1>
        <p className=" dark:text-white"><Skeleton count={3} /></p>
        <p className="text-gray-500 dark:text-gray-200 mt-6 font-black"><Skeleton /></p>
    </div>
  )
}

export default SkeletonBlog