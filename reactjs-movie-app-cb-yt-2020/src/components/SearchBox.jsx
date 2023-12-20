const SearchBox = ({ searchValue, setSearchValue }) => {
  console.log(searchValue);
  return (
    <div>
        <input 
            type="text" 
            placeholder="Type to search..." 
            className="w-[300px] md:w-[400] xl:w-[500px] px-2 py-3 rounded-xl"
            value={searchValue}
            onChange={(e) => {
              setSearchValue(e.target.value)
            }}
        />
    </div>
  );
};

export default SearchBox;