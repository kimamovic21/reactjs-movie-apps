const Footer = () => {
  return (
    <footer className="bg-black text-white p-6 w-full mt-[230px]">
      <div className="container mx-auto text-center">
        <p className="text-lg font-bold">Movies App</p>
        <div className="flex justify-center mt-4">
          <ul className="flex space-x-4">
            <li className="hover:underline">Home</li>
            <li className="hover:underline">Terms of Use</li>
            <li className="hover:underline">Privacy Policy</li>
            <li className="hover:underline">Contact Us</li>
          </ul>
        </div>
        <p className="mt-4">© 2023 React App, Inc.</p>
      </div>
    </footer>
  );
};

export default Footer;
