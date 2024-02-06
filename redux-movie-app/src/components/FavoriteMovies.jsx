import { useSelector, useDispatch } from 'react-redux';
import { removeFromFavorites } from '../features/moviesSlice';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const FavoriteMovies = () => {
  const favoriteMovies = useSelector((state) => state.movies.favoriteMovies);
  const dispatch = useDispatch();

  const handleRemoveFromFavorites = (movieId, movieTitle) => {
    dispatch(removeFromFavorites(movieId));
    toast.error(`${movieTitle} successfully removed from Favorites`);
  };

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-white">Your Favorite Movies</h2>
      {favoriteMovies.length === 0 ? (
        <p className="text-white">No favorite movies added yet.</p>
      ) : (
        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {favoriteMovies.map((movie) => (
            <div key={movie.imdbID} className="cursor-pointer shadow-2xl rounded-md text-white bg-black/70 relative p-4 flex flex-col justify-between">
              <Link to={`/movies/${movie.imdbID}`}>
                <img src={movie?.Poster} alt={movie?.Title} className="w-full h-72 object-cover mb-4" />
              </Link>
              <div className="text-center mb-2">{movie?.Title}</div>
              <button
                onClick={() => handleRemoveFromFavorites(movie.imdbID, movie.Title)}
                className="bg-red-500 w-full text-white p-2"
              >
                Remove from Favorites
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoriteMovies