import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';

import RemoveConfirmationModal from '../components/RemoveConfirmationModal';
import Spinner from '../components/Spinner'; 

const apiKey = import.meta.env.VITE_OMDB_API_KEY;

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(`https://www.omdbapi.com/?i=${id}&apikey=${apiKey}`);
        const data = response.data;
        setMovie(data);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      } finally {
        setLoading(false); // Set loading to false when fetching is complete
      }
    };

    fetchMovieDetails();
  }, [id]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const isMovieFavorite = storedFavorites.some((fav) => fav.imdbID === id);
    setIsFavorite(isMovieFavorite);
  }, [id]);

  const addToFavorites = () => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    if (!storedFavorites.some((fav) => fav.imdbID === id)) {
      const updatedFavorites = [...storedFavorites, movie];
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      setIsFavorite(true);
      toast.success(`${movie.Title} added to Favorites!`);
    }
  };

  const removeFromFavorites = () => {
    setIsModalOpen(true);
  };

  const handleConfirmRemove = () => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const updatedFavorites = storedFavorites.filter((fav) => fav.imdbID !== id);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    setIsFavorite(false);
    setIsModalOpen(false);
    toast.error(`${movie.Title} removed from Favorites!`);
  };

  const handleCancelRemove = () => {
    setIsModalOpen(false);
  };

  if (loading) {
    return <Spinner />;
  }

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto mt-8 bg-white/70 p-6 rounded-md shadow-md flex">
      <img src={movie.Poster} alt={movie.Title} className="w-1/3 h-72 object-contain rounded-md" />
      <div className="flex-1 ml-4">
        <h2 className="text-2xl font-bold mb-4">{movie.Title}</h2>
        <p>
          <strong>Year:</strong> {movie.Year}
        </p>
        <p>
          <strong>Rated:</strong> {movie.Rated}
        </p>
        <p>
          <strong>Runtime:</strong> {movie.Runtime}
        </p>
        <p>
          <strong>Genre:</strong> {movie.Genre}
        </p>
  
        <div className="mt-4">
          {isFavorite ? (
            <button
              onClick={removeFromFavorites}
              className="inline-block bg-red-500 text-white px-4 py-2 rounded-md transition duration-300 hover:bg-red-600 mr-4"
            >
              Remove from Favorites
            </button>
          ) : (
            <button
              onClick={addToFavorites}
              className="inline-block bg-blue-500 text-white px-4 py-2 rounded-md transition duration-300 hover:bg-blue-600 mr-4"
            >
              Add to Favorites
            </button>
          )}
  
          <Link
            to="/"
            className="inline-block bg-blue-500 text-white px-4 py-2 rounded-md transition duration-300 hover:bg-blue-600"
          >
            Back to Home
          </Link>
        </div>
      </div>
  
      <RemoveConfirmationModal
        isOpen={isModalOpen}
        onClose={handleCancelRemove}
        onConfirm={handleConfirmRemove}
      />
    </div>
  );
};

export default MovieDetails;





