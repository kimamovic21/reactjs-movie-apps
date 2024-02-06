import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const apiKey = process.env.REACT_APP_OMDB_KEY;
const apiBaseUrl = 'http://www.omdbapi.com/';

export const fetchMovies = createAsyncThunk('movies/fetchMovies', async (searchQuery) => {
  try {
    const response = await axios.get(apiBaseUrl, {
      params: {
        apikey: apiKey,
        s: searchQuery,
      },
    });
    return response.data.Search || [];
  } 
  catch (error) {
    console.error(error);
    throw error;
  }
});

export const fetchMovieDetails = createAsyncThunk('movies/fetchMovieDetails', async (id) => {
  try {
    const response = await axios.get(apiBaseUrl, {
      params: {
        apikey: apiKey,
        i: id,
      },
    });
    return response.data;
  } 
  catch (error) {
    console.error(error);
    throw error;
  }
});

const moviesSlice = createSlice({
  name: 'movies',
  initialState: {
    movies: [],
    selectedMovie: null,
    favoriteMovies: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    addToFavorites: (state, action) => {
      const movieToAdd = action.payload;
      const isAlreadyInFavorites = state.favoriteMovies.some((movie) => movie.imdbID === movieToAdd.imdbID);

      if (!isAlreadyInFavorites) {
        state.favoriteMovies = [...state.favoriteMovies, movieToAdd];
        localStorage.setItem('favoriteMovies', JSON.stringify(state.favoriteMovies));
      }
    },
    removeFromFavorites: (state, action) => {
      const movieToRemoveId = action.payload;
      state.favoriteMovies = state.favoriteMovies.filter((movie) => movie.imdbID !== movieToRemoveId);
      localStorage.setItem('favoriteMovies', JSON.stringify(state.favoriteMovies));
    },
    resetMovies: (state) => {
      state.movies = [];
      state.selectedMovie = null;
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.movies = action.payload;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchMovieDetails.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMovieDetails.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.selectedMovie = action.payload;
      })
      .addCase(fetchMovieDetails.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { addToFavorites, removeFromFavorites, resetMovies } = moviesSlice.actions;
export default moviesSlice.reducer;
