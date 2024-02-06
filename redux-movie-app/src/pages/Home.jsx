import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px]">
      <h2 className="text-3xl text-white font-bold mb-4">
        Welcome to my ReactJS Redux Movie App
      </h2>
      <h3 className="text-xl text-white mb-6">
        Click Search Movies Button to search movies
      </h3>
      <Link to="/movies" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
        Search Movies
      </Link>
    </div>
  );
};

export default Home;
