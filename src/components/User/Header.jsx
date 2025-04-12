import React, { useContext } from 'react';
import { ShoppingCart, User, Heart } from 'lucide-react';
import { AuthContext } from '../../context/AuthContext';

const Header = () => {
  const { user } = useContext(AuthContext);
  return (
    <header className="bg-green-500 shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">

        <div className="text-2xl font-bold text-blue-600">
          ShopEase
        </div>

        <div className="flex-1 mx-6 max-w-xl">
          <input
            type="text"
            placeholder="Search for products..."
            className="w-full border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex items-center text-gray-700">
          <Heart className="cursor-pointer hover:text-red-500 ml-6" />
          <ShoppingCart className="cursor-pointer hover:text-blue-600 ml-2" />

          <img className='w-12 h-12 rounded-full ml-4' src={user?.yourImage} alt="" />
          {
            user ? <p className=' ml-2 font-bold'>{user?.fullname}</p>
              :
              <User className="cursor-pointer hover:text-blue-600" />
          }
        </div>

      </div>
    </header>
  );
};

export default Header;
