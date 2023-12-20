import { useEffect, useState } from "react";

import MovieList from "./components/MovieList";
import MovieListHeading from "./components/MovieListHeading";
import SearchBox from "./components/SearchBox";
import AddFavorite from "./components/AddFavorite";
import RemoveFavorite from "./components/RemoveFavorite";
import Footer from "./components/Footer";

const apiKey = import.meta.env.VITE_REACT_APP_OMDB_API_KEY;

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    if (searchValue === '') return;
		getMovieRequest(searchValue); // eslint-disable-next-line
	}, [searchValue]);

  useEffect(() => {
    const movieFavorites = JSON.parse(localStorage.getItem('react-movie-app-favorites'));

    setFavorites(movieFavorites);
  }, []);

  const getMovieRequest = async () => {
		const url = `https://www.omdbapi.com/?s=${searchValue}&apikey=${apiKey}`;

		const response = await fetch(url); console.log(response);
		const responseJson = await response.json(); console.log(responseJson);

    if (responseJson.Search) {
      setMovies(responseJson.Search);
    }
	};

  const saveToLocalStorage = (items) => {
		localStorage.setItem('react-movie-app-favorites', JSON.stringify(items));
	};

  const addFavoriteMovie = (movie) => {
    const newFavoriteList = [...favorites, movie];
    setFavorites(newFavoriteList);
    saveToLocalStorage(newFavoriteList);
  };

  const removeFavoriteMovie = (movie) => {
    const newFavoriteList = favorites.filter((favorite) => favorite.imdbID !== movie.imdbID);

    setFavorites(newFavoriteList);

    saveToLocalStorage(newFavoriteList);
  };

  return (
    <section className="absolute top-0 left-0 right-0 bg-black/30">
    <section className="m-4 "> 
      <div className="p-5 absolute w-full top-0 left-0 flex justify-between items-center mb-5 bg-black/70">
          <MovieListHeading heading='Search Movies' />
          <SearchBox 
            searchValue={searchValue}
            setSearchValue={setSearchValue}
          />
      </div>
      <div className="mt-[150px]">
        <MovieList 
          movies={movies} 
          favoriteComponent={AddFavorite}
          handleFavoriteClick={addFavoriteMovie}
        />
      </div>

      <div className="flex mt-10 justify-between items-center mb-5">
        <MovieListHeading heading='Favorite Movies List:' />
      </div>
      <div>
        <MovieList 
          movies={favorites} 
          favoriteComponent={RemoveFavorite}
          handleFavoriteClick={removeFavoriteMovie}
        />
      </div>
    </section>
    <Footer />
    </section>
  );
};

export default App;