import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { AppRoutes } from '../../constant/constant';
import { ShoppingCart, Heart } from 'lucide-react';

const Products = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = () => {
        axios
            .get(AppRoutes.getproducts)
            .then((res) => {
                console.log(res);
                setProducts(res?.data?.data || []);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div className="px-4 py-8 bg-gray-100 min-h-screen">
            <h2 className="text-3xl font-bold mb-8 text-center text-blue-700">🛒 Our Best Deals</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {products.map((product, index) => {
                    const discountedPrice = product.price - (product.price * product.discount) / 100;

                    return (
                        <div
                            key={index}
                            className="bg-white shadow-lg rounded-2xl overflow-hidden hover:shadow-xl transition duration-300 transform hover:-translate-y-1"
                        >
                            <div className="relative group">
                                <img
                                    src={product.image}
                                    alt={product.title}
                                    className="w-full h-52 object-contain p-4 bg-white transition-transform duration-300 group-hover:scale-105"
                                />
                                <Heart
                                    size={22}
                                    className="absolute top-3 right-3 text-gray-400 hover:text-red-500 transition duration-200 cursor-pointer"
                                />
                            </div>

                            <div className="px-4 pb-4">
                                <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
                                    {product.title}
                                </h3>

                                <div className="flex items-center gap-2 mb-4">
                                    <span className="text-lg font-bold text-green-600">Rs {Math.round(discountedPrice)}</span>
                                    <span className="text-sm line-through text-gray-400">Rs {product.price}</span>
                                    <span className="text-xs text-red-600">({product.discount}% OFF)</span>
                                </div>

                                <button className="w-full bg-blue-600 text-white py-2 rounded-full flex justify-center items-center gap-2 hover:bg-blue-700 active:scale-95 transition-all duration-200">
                                    <ShoppingCart size={18} />
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Products;
