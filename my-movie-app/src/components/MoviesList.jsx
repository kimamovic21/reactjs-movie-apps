import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaHeart } from 'react-icons/fa';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';

import FavoriteMovies from './FavoriteMovies';
import Spinner from './Spinner'; 

const apiKey = import.meta.env.VITE_OMDB_API_KEY;

const MoviesList = ({ searchValue }) => {
  const [movies, setMovies] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false); 

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(storedFavorites);
  }, []);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const fetchMovies = async () => {
    try {
      setLoading(true); 
      const response = await axios.get(`https://www.omdbapi.com/?s=${searchValue}&apikey=${apiKey}`);
      const data = response.data;
      setMovies(data.Search);
    } 
    catch (error) {
      console.error('Error fetching movies:', error);
    } finally {
      setLoading(false); 
    }
  };

  useEffect(() => {
    fetchMovies();  // eslint-disable-next-line
  }, [searchValue]);

  const addToFavorites = (movie) => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];

    const isAlreadyFavorite = storedFavorites.some((fav) => fav.imdbID === movie.imdbID);

    if (isAlreadyFavorite) {
      toast.warning(`${movie.Title} is already in Favorites!`, {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        style: { backgroundColor: 'yellow', color: '#000' },
      });
    } 
    else {
      const updatedFavorites = [...storedFavorites, movie];
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      setFavorites(updatedFavorites);

      toast.success(`${movie.Title} added to Favorites!`);
    }
  };

  const removeFromFavorites = (movie) => {
    setFavorites((prevFavorites) => prevFavorites.filter((fav) => fav.imdbID !== movie.imdbID));

    toast.error(`${movie.Title} removed from Favorites!`);
  };

  return (
    <section>
      {loading && <Spinner />}
      <div className="m-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {movies?.map((movie) => (
          <div key={movie.imdbID} className="relative">
            <div className="bg-white/70 p-4 rounded-md shadow-md">
              <Link to={`/movies/${movie.imdbID}`} className="block">
                <div>
                  <img
                    src={movie.Poster}
                    alt={movie.Title}
                    className="w-full h-56 object-contain rounded-md mb-4"
                  />
                  <p className="text-gray-800 font-bold">{movie.Title}</p>
                  <p className="text-gray-500">{movie.Year}</p>
                </div>
              </Link>
              <div className="p-2">
                <button
                  className="flex justify-center items-center bg-blue-500 text-white px-4 py-2 rounded-md transition duration-300 hover:bg-blue-600 mb-2"
                  onClick={() => addToFavorites(movie)}
                >
                  <div>
                    <FaHeart />
                  </div>
                  Add to Favorites
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div>
        <FavoriteMovies 
          favorites={favorites} 
          removeFromFavorites={removeFromFavorites} 
        />
      </div>
    </section>
  );
};

export default MoviesList;
