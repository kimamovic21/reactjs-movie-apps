import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDebounce } from "use-debounce";
import { RootState } from "../redux/store";
import { fetchMovies, searchMovies } from "../slices/moviesSlice";

const Home: React.FC = () => {
  const [query, setQuery] = useState("");
  const [debouncedQuery] = useDebounce(query, 500); 
  const dispatch = useDispatch<any>();
  const { movies, loading, error } = useSelector((state: RootState) => state.movies);

  useEffect(() => {
    if (debouncedQuery.trim().length >= 3) {
      dispatch(searchMovies(debouncedQuery));
    } else if (debouncedQuery.trim().length === 0) {
      dispatch(fetchMovies());
    };
  }, [debouncedQuery, dispatch]);

  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <div className="m-2 w-full p-4">
      <h1 className="mt-2 text-center text-3xl">Welcome to my Movies/TV Shows App</h1>

      <form onSubmit={handleSearch} className="mt-4 text-center">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for movies..."
          className="mr-2 p-2 border rounded"
        />
        <button type="submit" className="p-2 bg-blue-500 text-white rounded">
          Search
        </button>
      </form>

      {loading && <div className="mt-4 text-center">Loading...</div>}

      {error && <div className="mt-4 text-center">Error: {error}</div>}

      {!loading && !error && (
        <div className="card-container mt-5 grid gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {movies?.map((movie: any) => (
            <div key={movie?.id} className="flex flex-col items-center rounded-lg shadow-xl">
              <img
                src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                alt={movie?.title}
                className="w-40 h-60 object-cover rounded-lg"
              />
              <p className="p-4 text-center">{movie?.title}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;