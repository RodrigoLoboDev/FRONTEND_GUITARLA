import Skeleton from "react-loading-skeleton"
import 'react-loading-skeleton/dist/skeleton.css'


const SkeletonGuitar = () => {
  return (
    <div className="grid sm:grid-cols-2 sm:py-16 sm:px-40">
        <Skeleton className=" h-[200px] w-[350] rounded-xl"/>
        <div className=" space-y-2">
            <Skeleton className=" h-4 w-[250px]" />
            <Skeleton className=" h-4 w-[150px]" />
            <Skeleton className=" h-4 w-[150px]" />
            <Skeleton className=" h-4 w-[150px]" />
            <Skeleton className=" h-4 w-[150px]" />
        </div>
    </div>
  )
}

export default SkeletonGuitar