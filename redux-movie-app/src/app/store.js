import { configureStore } from '@reduxjs/toolkit';
import moviesReducer from '../features/moviesSlice';

const preloadedState = {
  movies: {
    favoriteMovies: JSON.parse(localStorage.getItem('favoriteMovies')) || [],
  },
};

const store = configureStore({
  reducer: {
    movies: moviesReducer,
  },
  preloadedState,
});

export default store;
