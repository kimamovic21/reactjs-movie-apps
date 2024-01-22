import { MdMovie } from "react-icons/md";

const Header = () => {
  return (
    <header className="mt-3 text-3xl font-bold mb-6 text-white text-center flex justify-center items-center gap-3">
        <h1> React Movie App </h1>
        <p><MdMovie size={40}/></p>
    </header>
  );
};

export default Header;