import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovies, resetMovies, addToFavorites } from '../features/moviesSlice';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Spinner from '../components/Spinner';
import FavoriteMovies from '../components/FavoriteMovies';

const Movies = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const dispatch = useDispatch();

  const movies = useSelector((state) => state.movies.movies);
  const status = useSelector((state) => state.movies.status);
  const favoriteMovies = useSelector((state) => state.movies.favoriteMovies);

  useEffect(() => {
    dispatch(fetchMovies(searchQuery));
  }, [dispatch, searchQuery]);

  const handleResetMovies = () => {
    dispatch(resetMovies());
    setSearchQuery('');
  };

  const handleAddToFavorites = (movie) => {
    const isAlreadyInFavorites = favoriteMovies.some((favoriteMovie) => favoriteMovie.imdbID === movie.imdbID);

    if (!isAlreadyInFavorites) {
      dispatch(addToFavorites(movie));
      toast.success(`${movie.Title} Successfully Added to Favorites`, { position: "top-right" });
    } 
    else {
      toast.warning(`${movie.Title} is Already in Favorites`, { position: "top-right" });
    }
  };

  return (
    <div className="container mx-auto m-8 min-h-[400px]">
      <div className="mb-4">
        <Link to="/" className="text-blue-500 hover:underline">
          Back to Home
        </Link>
      </div>
      <form className="mb-8">
        <div className="flex">
          <input
            type="text"
            placeholder="Search for movies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border p-2 w-full"
          />
          <button type="button" onClick={handleResetMovies} className="bg-red-500 text-white p-2 ml-2">
            Reset
          </button>
        </div>
      </form>
      {status === 'loading' && <Spinner />}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {movies?.map((movie) => (
          <div key={movie.imdbID} className="cursor-pointer shadow-2xl rounded-md text-white bg-black/70 relative p-4 flex flex-col justify-between">
            <Link to={`/movies/${movie.imdbID}`}>
              <img src={movie?.Poster} alt={movie?.Title} className="w-full h-72 object-cover mb-4" />
            </Link>
            <div className="text-center mb-2">{movie?.Title}</div>
            <button
              onClick={() => handleAddToFavorites(movie)}
              className="bg-blue-500 w-full text-white p-2"
            >
              Add to Favorites
            </button>
          </div>
        ))}
      </div>
      <FavoriteMovies />
    </div>
  );
};

export default Movies;
