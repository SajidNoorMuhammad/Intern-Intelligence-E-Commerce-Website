import axios from 'axios';
import React, { useContext, useState } from 'react';
import { AppRoutes } from '../../constant/constant';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router';
import Cookies from 'js-cookie';
import { Eye, EyeOff } from 'lucide-react'; // You can also use any icon library
import { Link } from 'react-router-dom';

export default function LoginPage() {
    const [loading, setLoading] = useState(false);
    const { setUser } = useContext(AuthContext);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();

        const obj = {
            cnicNum: e.target[0].value,
            password: e.target[1].value
        };

        setLoading(true);
        axios
            .post(AppRoutes.login, obj)
            .then((res) => {
                Cookies.set("token", res?.data?.data?.token, { expires: 1 });
                setUser(res?.data?.data?.user);
                navigate('/');
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            });
    };

    return (
        <div className=" max-sm:min-h-0 max-sm:py-12 py-16 flex items-center justify-center bg-gradient-to-br from-purple-300 via-pink-200 to-yellow-100 p-4">
            <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md transition-transform transform hover:scale-105">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Login</h2>
                <form onSubmit={handleLogin} className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-gray-600">CNIC Number</label>
                        <input
                            type="text"
                            placeholder="xxxxx-xxxxxxx-x"
                            name="cnicNum"
                            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
                            required
                        />
                    </div>
                    <div className="relative">
                        <label className="block text-sm font-medium text-gray-600">Password</label>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Enter your password"
                            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 pr-12"
                            required
                        />
                        <span
                            className="absolute top-9 right-4 text-gray-500 cursor-pointer"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </span>
                    </div>
                    <div className="flex justify-between max-sm:justify-baseline text-sm text-gray-500 ">
                        <span>Don't have an account? <Link to={"/register"} className="text-indigo-600 hover:underline">Sign up</Link></span>
                        <Link to={'/forget'} className="text-indigo-600 hover:underline">Forgot Password?</Link>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-indigo-600 text-white py-2 rounded-xl hover:bg-indigo-700 transition duration-200"
                    >
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </form>
            </div>
        </div>
    );
}
