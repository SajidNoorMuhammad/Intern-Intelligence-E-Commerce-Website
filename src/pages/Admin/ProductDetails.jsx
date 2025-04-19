import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { AppRoutes } from '../../constant/constant';
import {
    PackageOpen,
    Tags,
    Building2,
    BadgePercent,
    BadgeDollarSign,
    CalendarDays,
    CircleCheck,
    FileText,
    ArrowLeft,
} from 'lucide-react';
import Loader from '../../components/Home/Loading';

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            fetchProductDetails();
        }
    }, [id]);

    const fetchProductDetails = async () => {
        try {
            const res = await axios.get(`${AppRoutes.adminproducts}/${id}`);
            setProduct(res?.data?.data);
        } catch (error) {
            console.error('Error fetching product:', error);
        }
    };

    if (!product) {
        return <div className="p-6 text-gray-600 text-center"><Loader /></div>;
    }

    return (
        <div className="max-w-5xl mx-auto p-6">
            <div className="bg-white shadow-lg rounded-2xl overflow-hidden">
                <div className="md:flex">
                    {/* Product Image */}
                    <div className="md:w-1/2 bg-gray-100 p-4 flex items-center justify-center">
                        <img
                            src={product.image}
                            alt={product.title}
                            className="w-full h-64 object-contain rounded"
                        />
                    </div>

                    {/* Product Info */}
                    <div className="md:w-1/2 p-6 space-y-4">
                        <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
                            <PackageOpen size={24} /> {product.title}
                        </h2>

                        <div className="space-y-2 text-gray-700 text-sm">
                            <p className="flex items-center gap-2">
                                <Tags size={18} className="text-blue-500" />
                                <span className="font-semibold">Category:</span> {product.category}
                            </p>
                            <p className="flex items-center gap-2">
                                <Building2 size={18} className="text-purple-500" />
                                <span className="font-semibold">Company:</span> {product.company}
                            </p>
                            <p className="flex items-center gap-2">
                                <BadgeDollarSign size={18} className="text-green-500" />
                                <span className="font-semibold">Price:</span> Rs {product.price}
                            </p>
                            <p className="flex items-center gap-2">
                                <BadgePercent size={18} className="text-pink-500" />
                                <span className="font-semibold">Discount:</span> {product.discount}%
                            </p>
                            <p className="flex items-center gap-2">
                                <CircleCheck size={18} className="text-emerald-500" />
                                <span className="font-semibold">Status:</span> {product.status}
                            </p>
                            <p className="flex items-center gap-2">
                                <FileText size={18} className="text-orange-500" />
                                <span className="font-semibold">Batch No:</span> {product.batchNo}
                            </p>
                            <p className="flex items-center gap-2">
                                <CalendarDays size={18} className="text-gray-600" />
                                <span className="font-semibold">Added On:</span>{' '}
                                {new Date(product.createdAt).toLocaleDateString()}
                            </p>
                            <p className="flex items-center gap-2">
                                <CalendarDays size={18} className="text-gray-600" />
                                <span className="font-semibold">Updated On:</span>{' '}
                                {new Date(product.updatedAt).toLocaleDateString()}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Description Section */}
                <div className="border-t px-6 py-4">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Product Description</h3>
                    <p className="text-gray-600 text-sm">{product.description}</p>
                    <p className="text-gray-600 text-sm">{product._id}</p>
                </div>
            </div>
            <button
                onClick={() => navigate(-1)}
                className=' flex items-centre cursor-pointer bg-blue-600 p-2 mt-4 rounded-md text-white font-bold gap-1'>
                <ArrowLeft /> Go back
            </button>
        </div>
    );
};

export default ProductDetails;
