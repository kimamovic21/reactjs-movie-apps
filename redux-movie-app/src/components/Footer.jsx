const Footer = () => {
  return (
    <footer className="bg-black py-8 mt-[100px]">
      <div className="container mx-auto flex flex-col items-center">
        <div className="flex mb-4">
          <a href="#home" className="text-gray-500 hover:text-white mr-4">
            Home
          </a>
          <a href="#terms" className="text-gray-500 hover:text-white mr-4">
            Terms of Use
          </a>
          <a href="#policy" className="text-gray-500 hover:text-white">
            Privacy Policy
          </a>
        </div>
        <div className="flex">
          <a href="#help" className="text-gray-500 hover:text-white mr-4">
            Help Center
          </a>
          <a href="#cookie" className="text-gray-500 hover:text-white mr-4">
            Cookie Preferences
          </a>
          <a href="#corporate" className="text-gray-500 hover:text-white">
            Corporate Information
          </a>
        </div>
        <div className="mt-4">
          <p className="text-gray-500">&copy; 2024 Kerim Redux Movie App. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
