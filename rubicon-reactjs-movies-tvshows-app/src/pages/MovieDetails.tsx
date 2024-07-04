import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { fetchMovieDetails } from '../slices/movieDetailsSlice';

const MovieDetails: React.FC = () => {
  const { movieId } = useParams<{ movieId: string }>();
  const dispatch = useDispatch();
  const { movie, videos, loading, error } = useSelector((state: RootState) => state.movieDetails);

  useEffect(() => {
    dispatch(fetchMovieDetails(movieId));
  }, [dispatch, movieId]);

  if (loading) {
    return <div className="text-center mt-4">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-4">Error: {error}</div>;
  }

  return (
    <div className="m-2 w-full p-4">
      <h1 className="mt-2 text-center text-3xl">{movie?.title}</h1>

      <div className="flex justify-center mt-4">
        <img
          src={`https://image.tmdb.org/t/p/w300${movie?.poster_path}`}
          alt={movie?.title}
          className="w-64 h-96 object-cover rounded-lg"
        />
      </div>

      <div className="mt-4">
        <p className="text-lg font-bold">Overview:</p>
        <p className="mt-2">{movie?.overview}</p>
      </div>

      <div className="mt-4">
        <p className="text-lg font-bold">Details:</p>
        <ul className="mt-2">
          <li><strong>Original Language:</strong> {movie?.original_language}</li>
          <li><strong>Popularity:</strong> {movie?.popularity}</li>
          <li><strong>Release Date:</strong> {movie?.release_date}</li>
          <li><strong>Vote Average:</strong> {movie?.vote_average}</li>
          <li><strong>Vote Count:</strong> {movie?.vote_count}</li>
        </ul>
      </div>

      {videos && videos.results.length > 0 && (
        <div className="mt-4">
          <p className="text-lg font-bold">Videos:</p>
          <div className="flex justify-center mt-2">
            <iframe
              width="560"
              height="315"
              src={`https://www.youtube.com/embed/${videos.results[0].key}`}
              title="YouTube video player"
              frameBorder="0"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieDetails;