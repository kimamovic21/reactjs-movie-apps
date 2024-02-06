import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { fetchMovieDetails, addToFavorites, removeFromFavorites } from '../features/moviesSlice';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Spinner from '../components/Spinner';

const MovieDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMovieDetails(id));
  }, [dispatch, id]);

  const movie = useSelector((state) => state.movies.selectedMovie);
  const favoriteMovies = useSelector((state) => state.movies.favoriteMovies);

  if (!movie) {
    return <Spinner />;
  }

  const isMovieInFavorites = favoriteMovies.some((favoriteMovie) => favoriteMovie.imdbID === movie?.imdbID);

  const handleAddToFavorites = () => {
    dispatch(addToFavorites(movie));
    toast.success(`${movie.Title} Successfully Added to Favorites`, { position: toast.POSITION.TOP_RIGHT });
  };

  const handleRemoveFromFavorites = () => {
    dispatch(removeFromFavorites(movie?.imdbID));
    toast.error(`${movie.Title} Successfully Removed from Favorites`, { position: toast.POSITION.TOP_RIGHT });
  };

  const showFavoritesButtons = movie && movie.imdbID; 

  return (
    <div className="container mx-auto m-8 max-w-2xl shadow-md p-2 bg-black/70 min-h-[400px]">
      <Link to="/movies" className="text-blue-500 hover:underline">
          Back to Movies
      </Link>
      {showFavoritesButtons && (
        <div className="flex">
          <div className="w-1/3">
            <img src={movie.Poster} alt={movie.Title} className="w-full h-auto object-cover" />
          </div>
          <div className="w-2/3 ml-4">
            <div className="flex justify-between items-center">
              <h2 className="text-gray-100 text-3xl font-bold mb-2">{movie?.Title}</h2>
            </div>
            <p className="text-gray-100 mb-4">{`${movie.Year || 'N/A'} | ${movie.Runtime || 'N/A'} | ${movie.Genre || 'N/A'}`}</p>
            <p className="text-gray-100">{movie?.Plot || 'No plot available.'}</p>
            <div className="mt-4">
              <p className="text-gray-100">
                <strong>Director:</strong> {movie?.Director || 'N/A'}
              </p>
              <p className="text-gray-100">
                <strong>Actors:</strong> {movie?.Actors || 'N/A'}
              </p>
              <p className="text-gray-100">
                <strong>Language:</strong> {movie?.Language || 'N/A'}
              </p>
            </div>
            <div className="mt-4">
              {isMovieInFavorites ? (
                <button onClick={handleRemoveFromFavorites} className="bg-red-500 text-white p-2">
                  Remove from Favorites
                </button>
              ) : (
                <button onClick={handleAddToFavorites} className="bg-blue-500 text-white p-2">
                  Add to Favorites
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieDetails;