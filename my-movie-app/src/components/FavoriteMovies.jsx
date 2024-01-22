import React, { useState } from 'react';
import { MdDelete } from 'react-icons/md';
import { Link } from 'react-router-dom';
import RemoveConfirmationModal from './RemoveConfirmationModal';

const FavoriteMovies = ({ favorites, removeFromFavorites }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const openModal = (movie) => {
    setSelectedMovie(movie);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedMovie(null);
    setModalOpen(false);
  };

  const confirmRemove = () => {
    if (selectedMovie) {
      removeFromFavorites(selectedMovie);
    }
  };

  return (
    <div className="mt-6">
      <h2 className="text-2xl font-bold mb-4 text-white">Favorite Movies</h2>
      {favorites.length === 0 ? (
        <p className="text-white">No favorite movies added yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {favorites.map((favorite) => (
            <div key={favorite.imdbID} className="relative">
              <div className="bg-white/70 p-4 rounded-md shadow-md">
                <Link to={`/movies/${favorite.imdbID}`} className="block">
                  <div>
                    <img
                      src={favorite.Poster}
                      alt={favorite.Title}
                      className="w-full h-56 object-contain rounded-md mb-4"
                    />
                    <p className="text-gray-800 font-bold">{favorite.Title}</p>
                    <p className="text-gray-500">{favorite.Year}</p>
                  </div>
                </Link>
                <div className="p-2">
                  <button
                    className="flex items-center bg-red-500 text-white px-4 py-2 rounded-md transition duration-300 hover:bg-red-600"
                    onClick={() => openModal(favorite)}
                  >
                    <div>
                      <MdDelete />
                    </div> Remove from Favorites
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <RemoveConfirmationModal
        isOpen={modalOpen}
        onClose={closeModal}
        onConfirm={confirmRemove}
      />
    </div>
  );
};

export default FavoriteMovies;
