import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { AppRoutes } from '../../constant/constant';
import { Link } from 'react-router-dom';

const RegisterPage = () => {
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);
    const navigate = useNavigate();

    const handleRegister = (e) => {
        e.preventDefault();
        const form = new FormData();
        form.append('fullname', e.target.fullname.value);
        form.append('email', e.target.email.value);
        form.append('password', e.target.password.value);
        form.append('yourImage', e.target.yourImage.files[0]);
        form.append('address', e.target.address.value);
        form.append('phoneNum', e.target.phoneNum.value);
        form.append('cnicNum', e.target.cnicNum.value);

        setLoading(true);
        axios
            .post(AppRoutes.registers, form)
            .then((res) => {
                setLoading(false);
                console.log(res);
                navigate('/login');
            })
            .catch((error) => {
                console.log(error);
            })
    }


    const handleImagePreview = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImagePreview(URL.createObjectURL(file));
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 px-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 space-y-6">
                <h2 className="text-3xl font-bold text-center text-indigo-700">Register</h2>
                <form onSubmit={handleRegister} className="space-y-4" encType="multipart/form-data">
                    <Input label="Full Name" name="fullname" type="text" />
                    <Input label="Email" name="email" type="email" />

                    <div className="relative space-y-1">
                        <label className="text-sm font-medium text-gray-700">Password</label>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            className="w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm pr-10 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition duration-200"
                            required
                        />
                        <span
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute top-8 right-3 text-gray-500 cursor-pointer text-xl"
                        >
                            {showPassword ? '🙈' : '👁️'}
                        </span>
                    </div>


                    <div className="space-y-1">
                        <label className="text-sm font-medium text-gray-700">Upload Image</label>
                        <input
                            type="file"
                            name="yourImage"
                            accept="image/*"
                            onChange={handleImagePreview}
                            className="w-full px-3 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition duration-200"
                            required
                        />
                        {imagePreview && (
                            <img src={imagePreview} alt="Preview" className="h-20 mt-2 rounded-md object-cover" />
                        )}
                    </div>


                    <Input label="Address" name="address" type="text" />
                    <Input label="Phone Number" name="phoneNum" type="number" />
                    <Input label="CNIC Number" name="cnicNum" type="number" />

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-indigo-600 text-white py-2 rounded-xl hover:bg-indigo-700 transition duration-200 font-semibold"
                    >
                        {loading ? 'Registering...' : 'Register'}
                    </button>

                    <p className="text-center text-sm text-gray-600 mt-4">
                        Already have an account?{' '}
                        <Link to={"/login"} className="text-indigo-600 font-medium hover:underline">Login</Link>
                    </p>
                </form>
            </div>
        </div>
    );
}



const Input = ({ label, name, type }) => (
    <div className="space-y-1">
        <label className="text-sm font-medium text-gray-700">{label}</label>
        <input
            type={type}
            name={name}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition duration-200"
        />
    </div>
);


export default RegisterPage;
