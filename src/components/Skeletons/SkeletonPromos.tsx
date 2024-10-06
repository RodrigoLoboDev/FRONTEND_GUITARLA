import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'


const SkeletonPromos = () => {
  return (
    <div className='h-full container mx-auto max-w-[95%]'>
        
      
      <h2 className="text-base font-bold mb-1 dark:text-gray-300">{<Skeleton />}</h2>
      <p>{<Skeleton />}</p>
      
      <p className="text-sm dark:text-white text-center">{<Skeleton count={2} />}</p>
        
    </div>
  )
}

export default SkeletonPromos