const Footer = () => {
  return (
    <footer className="bg-blue-600 text-white py-8">
      <div className="container mx-auto text-center">
        <p className="text-lg font-semibold">
          &copy; {new Date().getFullYear()} TeleHealth | All Rights Reserved
        </p>
        <div className="flex justify-center space-x-4 mt-4">
          <a href="#" className="hover:text-gray-300">
            Facebook
          </a>
          <a href="#" className="hover:text-gray-300">
            Twitter
          </a>
          <a href="#" className="hover:text-gray-300">
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;