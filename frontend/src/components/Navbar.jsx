import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/');
  };

  return (
    <nav className="bg-blue-500 shadow-md text-white">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="text-[28px] font-bold">
          <a href="/">TeleHealth App.</a>
        </div>
        <ul className="flex space-x-6 items-center text-[16px]">
          <li><a href="/" className="hover:text-gray-200">Home</a></li>
          <li><a href="/about" className="hover:text-gray-200">About</a></li>
          <li><a href="/appointments" className="hover:text-gray-200">Appointments</a></li>
          <li><a href="/contact" className="hover:text-gray-200">Contact</a></li>
          {isLoggedIn ? (
            <>
              <li>
                <button 
                  onClick={handleLogout} 
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <li>
              <a 
                href="/auth" 
                className="bg-white text-blue-600 px-4 py-2 rounded-lg hover:bg-gray-100"
              >
                Login/Signup
              </a>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;