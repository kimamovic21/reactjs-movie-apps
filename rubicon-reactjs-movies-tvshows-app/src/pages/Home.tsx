import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { fetchMovies } from "../slices/moviesSlice";

const Home: React.FC = () => {
  const dispatch = useDispatch<any>();
  const { movies, loading, error } = useSelector((state: RootState) => state.movies);

  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);

  return (
    <div className="m-2 w-full p-4">
      <h1 className="mt-2 text-center text-3xl">Welcome to my Movies/TV Shows App</h1>

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