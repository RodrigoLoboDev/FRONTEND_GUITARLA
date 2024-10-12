import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <img 
        className=' max-w-lg'
        src="/img/Not_Found.png" 
        alt="not found" 
      />
      <h1 className="text-6xl font-bold text-gray-800 mb-8">Error 404</h1>

      <p className="text-4xl text-gray-600 mb-8 font-bold">Page not found</p>
      <p className="text-2xl text-gray-600 mb-8">The page you've reached does not exist or is no longer available.</p>
      <Link 
        to="/" 
        className="bg-blue-500 text-white text-2xl font-bold py-2 px-8 rounded hover:bg-blue-700 transition-all"
      >
        Head back to home
      </Link>
    </div>
  );
};

export default NotFoundPage;
