import { CiSearch } from "react-icons/ci";

const SearchMovie = ({ searchValue, handleSearchChange }) => {
  return (
    <div className="relative">
        <input
            type="text"
            value={searchValue}
            onChange={handleSearchChange}
            placeholder="Search movies"
            className="border border-gray-300 p-3 mb-4 w-full rounded-lg pl-10"
        />
        <div className="absolute top-3 right-3 text-gray-400">
            <CiSearch size={25}/>
        </div>
    </div>
  );
};

export default SearchMovie;