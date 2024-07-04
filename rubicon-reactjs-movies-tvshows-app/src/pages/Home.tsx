import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useDebounce } from "use-debounce";
import { RootState } from "../redux/store";
import { fetchMovies, searchMovies } from "../slices/moviesSlice";
import { fetchTVShows, searchTVShows } from "../slices/showsSlice";

const Home: React.FC = () => {
  const [query, setQuery] = useState("");
  const [debouncedQuery] = useDebounce(query, 500);
  const [activeTab, setActiveTab] = useState<"movies" | "tvShows">(() => {
    const searchParams = new URLSearchParams(window.location.search);
    return searchParams.get("tab") as "movies" | "tvShows" || "tvShows";
  });

  const dispatch = useDispatch<any>();
  const location = useLocation();

  const { movies, loading: moviesLoading, error: moviesError } = useSelector((state: RootState) => state.movies);
  const { tvShows, loading: tvShowsLoading, error: tvShowsError } = useSelector((state: RootState) => state.tvShows);

  useEffect(() => {
    if (activeTab === "movies") {
      dispatch(fetchMovies());
    } else {
      dispatch(fetchTVShows());
    }
  }, [dispatch, activeTab]);

  useEffect(() => {
    if (debouncedQuery.trim().length >= 3) {
      if (activeTab === "movies") {
        dispatch(searchMovies(debouncedQuery));
      } else {
        dispatch(searchTVShows(debouncedQuery));
      }
    } else if (debouncedQuery.trim().length === 0) {
      if (activeTab === "movies") {
        dispatch(fetchMovies());
      } else {
        dispatch(fetchTVShows());
      }
    }
  }, [debouncedQuery, dispatch, activeTab]);

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  const handleTabChange = (tab: "movies" | "tvShows") => {
    setActiveTab(tab);
    setQuery(""); // Clear the search query when switching tabs

    // Update URL query parameter without using history
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("tab", tab);
    window.history.replaceState({}, '', `${location.pathname}?${searchParams.toString()}`);
  };

  const loading = activeTab === "movies" ? moviesLoading : tvShowsLoading;
  const error = activeTab === "movies" ? moviesError : tvShowsError;
  const items = activeTab === "movies" ? movies : tvShows;

  return (
    <div className="m-2 w-full p-4">
      <h1 className="mt-2 text-center text-3xl">Welcome to my Movies/TV Shows App</h1>

      <div className="mt-4 text-center">
        <button
          onClick={() => handleTabChange("movies")}
          className={`mr-2 p-2 ${activeTab === "movies" ? "bg-blue-500 text-white" : "bg-gray-300"}`}
        >
          Movies
        </button>
        <button
          onClick={() => handleTabChange("tvShows")}
          className={`p-2 ${activeTab === "tvShows" ? "bg-blue-500 text-white" : "bg-gray-300"}`}
        >
          TV Shows
        </button>
      </div>

      <form onSubmit={handleSearch} className="mt-4 text-center">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={`Search for ${activeTab === "movies" ? "movies" : "TV shows"}...`}
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
          {items?.map((item: any) => (
            <Link key={item?.id} to={`/${activeTab === "movies" ? "movie" : "show"}/${item.id}`}>
              <div className="flex flex-col items-center rounded-lg shadow-xl cursor-pointer">
                <img
                  src={`https://image.tmdb.org/t/p/w300${item.poster_path}`}
                  alt={item?.title || item?.name}
                  className="w-40 h-60 object-cover rounded-lg"
                />
                <p className="p-4 text-center">{item?.title || item?.name}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;