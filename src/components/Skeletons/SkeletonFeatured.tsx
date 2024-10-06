import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'


const SkeletonFeatured = () => {
  return (
    <div className=" grid grid-cols-1 md:grid-cols-3 gap-7 mt-5">
      <div className="blog-item border p-5 rounded-lg shadow-md">
        <h2><Skeleton /></h2>
        <p className="mb-4"><Skeleton count={2} /></p>
        <p><Skeleton count={1} /></p>
      </div>
      <div className="blog-item border p-5 rounded-lg shadow-md">
        <h2><Skeleton /></h2>
        <p className="mb-4"><Skeleton count={2} /></p>
        <p><Skeleton count={1} /></p>
      </div>
      <div className="blog-item border p-5 rounded-lg shadow-md">
        <h2><Skeleton /></h2>
        <p className="mb-4"><Skeleton count={2} /></p>
        <p><Skeleton count={1} /></p>
      </div>
    </div>
  )
}

export default SkeletonFeatured