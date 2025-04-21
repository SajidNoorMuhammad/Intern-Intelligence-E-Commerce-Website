import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AppRoutes } from '../../constant/constant';
import { ShoppingCart, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { message } from 'antd';
import Loader from '../../components/Home/Loading';
import { toast, ToastContainer } from 'react-toastify';

const Products = () => {
    const [products, setProducts] = useState([]);
    const { user } = useContext(AuthContext);
    const [loader, setLoader] = useState(true);

    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = () => {
        setLoader(true);
        axios
            .get(AppRoutes.getproducts)
            .then((res) => {
                setProducts(res?.data?.data || []);
                setLoader(false);
            })
            .catch((err) => {
                setLoader(false);
            });
    };

    const addtoCart = (product) => {
        const request = {
            productId: product?._id,
            userId: user?._id
        };

        try {
            axios
                .post(AppRoutes.addtocart, request)
                .then((res) => {
                    toast.success(`Product Add to Cart Successfully`)
                    getProducts();
                });
        } catch (error) {
            toast.error('❌ Failed to add to cart.');
        }
    };

    return (
        <div className="px-4 py-8 bg-gray-100 min-h-screen">
            <h2 className="text-3xl font-bold mb-8 text-center text-blue-700">🛒 Our Best Deals</h2>

            {loader ? (
                <div className="flex justify-center items-center h-96">
                    <Loader />
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {products.map((product, index) => {
                        const discountedPrice = product.price - (product.price * product.discount) / 100;

                        return (
                            <div
                                key={index}
                                className="bg-white shadow-lg rounded-2xl overflow-hidden hover:shadow-xl transition duration-300 transform hover:-translate-y-1"
                            >
                                <Link to={`/user/products/${product?._id}`} className="relative group">
                                    {/* Diagonal Ribbon */}
                                    <div className="absolute top-3 -left-8 w-32 transform -rotate-45 bg-red-600 text-white text-xs text-center font-bold py-1 shadow-lg z-10">
                                        {product.batchNo || 'N/A'}
                                    </div>

                                    <img
                                        src={product.image}
                                        alt={product.title}
                                        className="w-full h-52 object-contain p-4 bg-white transition-transform duration-300 group-hover:scale-105"
                                    />
                                    <Heart
                                        size={22}
                                        className="absolute top-3 right-3 text-gray-400 hover:text-red-500 transition duration-200 cursor-pointer"
                                    />
                                </Link>

                                <div className="px-4 pb-4">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
                                        {product.title}
                                    </h3>

                                    <div className="flex items-center gap-2 mb-4">
                                        <span className="text-lg font-bold text-green-600">Rs {Math.round(discountedPrice)}</span>
                                        <span className="text-sm line-through text-gray-400">Rs {product.price}</span>
                                        <span className="text-xs text-red-600">({product.discount}% OFF)</span>
                                    </div>

                                    {product?.status === "Available" ? (
                                        <button onClick={() => addtoCart(product)} className="w-full cursor-pointer bg-blue-600 text-white py-2 rounded-full flex justify-center items-center gap-2 hover:bg-blue-700 active:scale-95 transition-all duration-200">
                                            <ShoppingCart size={18} />
                                            Add to Cart
                                        </button>
                                    ) : (
                                        <button className="w-full bg-red-600 text-white py-2 rounded-full flex justify-center cursor-pointer items-center gap-2 hover:bg-red-700 active:scale-95 transition-all duration-200">
                                            <Heart size={18} />
                                            {product.status}
                                        </button>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
            <ToastContainer position='top-right' autoClose={3000} />
        </div>

    );
};

export default Products;
