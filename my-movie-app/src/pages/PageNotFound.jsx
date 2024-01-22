import { Link } from 'react-router-dom';

const PageNotFound = () => {
  return (
    <div className="max-w-2xl mx-auto mt-8 bg-white/70 p-6 rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-4">Page Not Found</h2>
      <p>Oops! The page you're looking for doesn't exist.</p>
      <div className="mt-4">
        <Link
          to="/"
          className="inline-block bg-blue-500 text-white px-4 py-2 rounded-md transition duration-300 hover:bg-blue-600"
        >
          Return to Home Page
        </Link>
      </div>
    </div>
  );
};

export default PageNotFound;
