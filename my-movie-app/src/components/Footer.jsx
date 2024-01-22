const Footer = () => {
  return (
    <footer className="mt-5 bg-black py-2 text-gray-400 text-sm">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0 md:mr-4">
          <span className="block mb-2">© {new Date().getFullYear()} Kerim Movie App</span>
          <a href="#privacy" className="block hover:text-white">Privacy</a>
          <a href="#terms" className="block hover:text-white">Terms</a>
        </div>
        <div>
          <span className="block mb-2">Follow us</span>
          <div className="flex">
            <a href="#facebook" className="text-blue-500 hover:text-blue-300 mr-2">Facebook</a>
            <a href="#twitter" className="text-blue-500 hover:text-blue-300 mr-2">Twitter</a>
            <a href="#instagram" className="text-blue-500 hover:text-blue-300">Instagram</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
