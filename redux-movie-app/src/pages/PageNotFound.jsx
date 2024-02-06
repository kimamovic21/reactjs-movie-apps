import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div className="flex justify-center items-center min-h-[320px]">
      <h1 className="text-2xl text-white">Page Not Found!</h1>
      <Link to="/" className="ml-4 text-blue-500 hover:underline">
         Back to Home
      </Link>
    </div>
  );
};

export default PageNotFound;