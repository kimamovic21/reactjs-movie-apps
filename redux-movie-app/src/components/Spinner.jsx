const Spinner = () => {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="animate-spin rounded-full border-t-4 border-blue-500 border-solid border-r-4 h-12 w-12"></div>
      <span className="ml-2 text-white">Loading...</span>
    </div>
  );
};

export default Spinner;
