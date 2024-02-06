import { Link } from "react-router-dom";
import { BiSolidCameraMovie } from "react-icons/bi";

const Header = () => {
  return (
    <div className="p-4 bg-black/70">
      <Link to='/'>
        <header className="flex items-center justify-center text-white">
          <h1 className="text-2xl text-center ">
            React Redux Movie App 
          </h1>
          <span className="ml-4"><BiSolidCameraMovie size={30} /></span>
        </header>
      </Link>
    </div>
  );
};

export default Header