const MovieList = ({ movies, favoriteComponent, handleFavoriteClick }) => {
  const FavoriteComponent = favoriteComponent;

  return (
    <div className='flex flex-wrap gap-5'>
      {movies?.map((movie, index) => {
        return (
          <div key={index} className='w-[250px]'>
            <img
              src={movie.Poster}
              alt={movie.Title}
            />
            <div onClick={() => handleFavoriteClick(movie)} className='bg-white p-2 flex'>
                <FavoriteComponent />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MovieList;
