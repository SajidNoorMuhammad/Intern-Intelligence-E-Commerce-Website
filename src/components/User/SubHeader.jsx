import React, { useContext, useState } from 'react';
import {
    Home,
    ShoppingBag,
    User,
    Heart,
    ShoppingCart,
    Boxes,
    MoreHorizontal,
    Menu,
    X,
    LogOut,
    LogOutIcon,
    Truck,
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import Cookies from 'js-cookie';

const navLinks = [
    { to: '/user', label: 'Home', icon: <Home size={20} /> },
    { to: '/user/products', label: 'Products', icon: <ShoppingBag size={20} /> },
    { to: '/user/profile', label: 'Profile', icon: <User size={20} /> },
    { to: '/user/wishlist', label: 'Wishlist', icon: <Heart size={20} /> },
    { to: '/user/cart', label: 'Cart', icon: <ShoppingCart size={20} /> },
    { to: '/user/order', label: 'Orders', icon: <Boxes size={20} /> }
];

const SubHeader = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const { user, setUser } = useContext(AuthContext);
    const navigate = useNavigate('');
    const [isMoreOpen, setIsMoreOpen] = useState(false);


    const handleLogout = () => {
        Cookies.set("token", "");
        setUser("");
        navigate('/login');
    }

    return (
        <div className="bg-gradient-to-r from-[#0f5b7b] to-[#0b3e56] shadow-md">
            {/* Desktop / Tablet Nav */}
            <div className="max-w-7xl mx-auto px-4 py-3 hidden md:flex flex-wrap justify-center md:justify-between gap-6">
                {navLinks.map((link, i) => (
                    <Link
                        key={i}
                        to={link.to}
                        className="flex items-center gap-2 text-white hover:text-yellow-400 font-medium transition-all duration-200 hover:underline underline-offset-4"
                    >

                        {link.icon}
                        {link.label}
                        <span className=' ml-10'>|</span>
                    </Link>

                ))}

                <div className="relative">
                    <button
                        onClick={() => setIsMoreOpen((prev) => !prev)}
                        className="flex items-center gap-2 text-white hover:text-yellow-400 font-medium transition-all duration-200 hover:underline underline-offset-4"
                    >
                        <MoreHorizontal size={20} />
                        More
                    </button>

                    {/* Dropdown for More */}
                    {isMoreOpen && (
                        <div className="absolute top-8 left-0 text-white bg-[#0b3e56] shadow-lg rounded-md py-2 w-29 z-20">
                            <Link
                                to="/user/trackorder"
                                className=" px-4 flex gap-2 items-center py-2 text-md text-white"
                                onClick={() => setIsMoreOpen(false)}
                            >
                                <Truck />Track
                            </Link>
                            <button
                                className=" px-4 gap-2 py-2 text-md flex items-center text-white"
                                onClick={handleLogout}
                            >
                                <LogOutIcon /> LogOut
                            </button>
                        </div>
                    )}
                </div>

            </div>

            {/* Mobile Nav Trigger */}
            <div className="md:hidden flex justify-between items-center px-4 py-3">
                <h1 className="text-white"><input placeholder='Search here...' className='border-1 p-2 w-[100%] border-white rounded-full' type="text" /></h1>
                <button onClick={() => setIsSidebarOpen(true)}>
                    <Menu className="text-white" />
                </button>
            </div>

            {/* Sidebar Overlay */}
            {isSidebarOpen && (
                <>
                    <div
                        className="fixed inset-0 backdrop-blur-xs z-40"
                        onClick={() => setIsSidebarOpen(false)}
                    ></div>

                    <div className="fixed top-0 left-0 w-64 h-full bg-white z-50 p-6 shadow-lg flex flex-col gap-6">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold text-[#0b3e56]"><i>ShopifyBeast</i></h2>
                            <button onClick={() => setIsSidebarOpen(false)}>
                                <X className="text-black" />
                            </button>
                        </div>

                        {navLinks.map((link, i) => (
                            <Link
                                key={i}
                                to={link.to}
                                onClick={() => setIsSidebarOpen(false)}
                                className="flex items-center gap-3 text-gray-800 hover:text-[#0b3e56] font-medium transition-all duration-200"
                            >
                                {link.icon}
                                {link.label}
                            </Link>
                        ))}
                        <button onClick={handleLogout} className=' bg-red-500 text-white font-bold rounded-md p-2 flex items-center justify-center gap-3 cursor-pointer'
                        > <LogOut /> LogOut</button>
                    </div>
                </>
            )}
        </div>
    );
};

export default SubHeader;
