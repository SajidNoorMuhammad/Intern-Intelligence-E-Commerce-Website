import React, { useContext, useEffect, useState } from 'react';
import { ShoppingCart, User, Heart } from 'lucide-react';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import { AppRoutes } from '../../constant/constant';
import { Link } from 'react-router-dom';

const Header = () => {
  const { user } = useContext(AuthContext);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        setLoading(true);
        const response = await axios.get(AppRoutes.usercart, {
          params: { userId: user._id },
        });
        setCartItems(response?.data?.data || []);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    if (user?._id) {
      fetchCartItems();
    }
  }, [user]);

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
          <Link to={'/wishlist'}>
            <Heart className="cursor-pointer hover:text-red-500 ml-6" />
          </Link>

          {/* 🛒 Cart Icon with Count */}
          <Link to={'/cart'}>
            <div className="relative ml-4">
              <ShoppingCart className="cursor-pointer hover:text-blue-600" />
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </div>
          </Link>

          {/* 👤 User Image or Icon */}
          {user?.yourImage ? (
            <img className="w-12 h-12 rounded-full ml-4" src={user?.yourImage} alt="User" />
          ) : (
            <User className="cursor-pointer hover:text-blue-600 ml-4" />
          )}
          {user && <p className="ml-2 font-bold">{user.fullname}</p>}
        </div>

      </div>
    </header>
  );
};

export default Header;
