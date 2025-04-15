import React from 'react';
import {
    Home,
    ShoppingBag,
    User,
    Heart,
    ShoppingCart,
    Boxes,
    MoreHorizontal,
} from 'lucide-react';
import { Link } from 'react-router-dom';

const SubHeader = () => {
    return (
        <div className="bg-gradient-to-r from-[#0f5b7b] to-[#0b3e56] shadow-md">
            <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap justify-center md:justify-between gap-6">

                <Link
                    to="/"
                    className="flex items-center gap-2 text-white hover:text-yellow-400 font-medium transition-all duration-200 hover:underline underline-offset-4"
                >
                    <Home size={20} />
                    Home
                </Link>

                <Link
                    to="/products"
                    className="flex items-center gap-2 text-white hover:text-yellow-400 font-medium transition-all duration-200 hover:underline underline-offset-4"
                >
                    <ShoppingBag size={20} />
                    Products
                </Link>

                <Link
                    to="/profile"
                    className="flex items-center gap-2 text-white hover:text-yellow-400 font-medium transition-all duration-200 hover:underline underline-offset-4"
                >
                    <User size={20} />
                    Profile
                </Link>

                <Link
                    to="/wishlist"
                    className="flex items-center gap-2 text-white hover:text-yellow-400 font-medium transition-all duration-200 hover:underline underline-offset-4"
                >
                    <Heart size={20} />
                    Wishlist
                </Link>

                <Link
                    to="/cart"
                    className="flex items-center gap-2 text-white hover:text-yellow-400 font-medium transition-all duration-200 hover:underline underline-offset-4"
                >
                    <ShoppingCart size={20} />
                    Cart
                </Link>

                <Link
                    to="/order"
                    className="flex items-center gap-2 text-white hover:text-yellow-400 font-medium transition-all duration-200 hover:underline underline-offset-4"
                >
                    <Boxes size={20} />
                    Orders
                </Link>

                <Link
                    to="/more"
                    className="flex items-center gap-2 text-white hover:text-yellow-400 font-medium transition-all duration-200 hover:underline underline-offset-4"
                >
                    <MoreHorizontal size={20} />
                    More
                </Link>

            </div>
        </div>
    );
};

export default SubHeader;
