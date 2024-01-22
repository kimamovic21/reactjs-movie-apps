import { useState } from 'react';
import MoviesList from '../components/MoviesList';
import SearchMovie from '../components/SearchMovie';

const Movies = () => {
  const [searchValue, setSearchValue] = useState('');

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  return (
    <div className="max-w-4xl mx-auto mt-8">
      <SearchMovie 
        searchValue={searchValue} 
        handleSearchChange={handleSearchChange}
      />
      <MoviesList searchValue={searchValue} />
    </div>
  );
};

export default Movies;
