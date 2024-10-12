import { StarIcon } from '@heroicons/react/20/solid'
import { Review } from '../../types';

type ReviewListProps = {
    reviews: Review[]
}

const ReviewList = ({ reviews } : ReviewListProps) => {

  // Función para renderizar las estrellas en base al rating
  const renderStars = (rating : number) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <StarIcon 
          key={i} 
          className={`h-5 w-5 ${i < rating ? 'text-yellow-500' : 'text-gray-300'}`} 
        />
      );
    }
    return stars;
  };

  return (
    <>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {reviews.map((review) => (
          <div key={review.id} className="bg-white rounded-lg shadow-md p-6 dark:bg-gray-800">
            {/* Nombre del usuario */}
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">{review.attributes.name}</h3>
            
            {/* Rating con estrellas */}
            <div className="flex items-center mb-2">
              {renderStars(review.attributes.rating)} {/* Llamamos a la función renderStars */}
            </div>

            {/* Contenido del comentario */}
            <p className="text-gray-600 dark:text-gray-300 mb-4">{review.attributes.content}</p>

            {/* ID del blog asociado (opcional) */}
            <span className="text-sm text-gray-400">Post ID: {review.attributes.blog.data.id}</span>
          </div>
        ))}
      </div>
    </>
  );
};

export default ReviewList;
