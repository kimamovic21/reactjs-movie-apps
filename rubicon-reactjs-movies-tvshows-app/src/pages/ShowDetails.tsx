import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { fetchShowDetails } from '../slices/showDetailsSlice';

const ShowDetails: React.FC = () => {
  const { showId } = useParams<{ showId: string }>();
  const dispatch = useDispatch();
  const { show, videos, loading, error } = useSelector((state: RootState) => state.showDetails);

  useEffect(() => {
    dispatch(fetchShowDetails(showId));
  }, [dispatch, showId]);

  if (loading) {
    return <div className="text-center mt-4">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-4">Error: {error}</div>;
  }

  return (
    <div className="m-2 w-full p-4">
      <h1 className="mt-2 text-center text-3xl">{show?.name}</h1>

      <div className="flex justify-center mt-4">
        <img
          src={`https://image.tmdb.org/t/p/w300${show?.poster_path}`}
          alt={show?.name}
          className="w-64 h-96 object-cover rounded-lg"
        />
      </div>

      <div className="mt-4">
        <p className="text-lg font-bold">Overview:</p>
        <p className="mt-2">{show?.overview}</p>
      </div>

      <div className="mt-4">
        <p className="text-lg font-bold">Details:</p>
        <ul className="mt-2">
          <li><strong>Original Language:</strong> {show?.original_language}</li>
          <li><strong>Popularity:</strong> {show?.popularity}</li>
          <li><strong>First Air Date:</strong> {show?.first_air_date}</li>
          <li><strong>Vote Average:</strong> {show?.vote_average}</li>
          <li><strong>Vote Count:</strong> {show?.vote_count}</li>
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

export default ShowDetails;