import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { AppRoutes } from '../../constant/constant';
import {
    CheckCircle,
    XCircle,
    Clock,
    Ban,
    Info,
    BadgePercent,
    ShoppingCart,
    Landmark,
    PackageSearch,
    InfoIcon
} from 'lucide-react';
import Loader from '../../components/Home/Loading';

const ProductDetail = () => {
    const { id } = useParams();
    const [detail, setDetail] = useState(null);
    const navigate = useNavigate();
    const [loader, setLoader] = useState(true);
    useEffect(() => {
        axios
            .get(`${AppRoutes.getproducts}/${id}`)
            .then((res) => {
                setDetail(res?.data?.data);
                setLoader(false);
            })
            .catch((err) => {
                console.error(err);
            });
    }, [id]);

    const getStatusIcon = (status) => {
        switch (status?.toLowerCase()) {
            case 'available':
                return <CheckCircle className="text-green-600" size={20} />;
            case 'not available':
                return <XCircle className="text-red-500" size={20} />;
            case 'coming soon':
                return <Clock className="text-yellow-500" size={20} />;
            case 'discontinued':
                return <Ban className="text-gray-500" size={20} />;
            default:
                return <Info className="text-gray-400" size={20} />;
        }
    };

    if (!detail) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="text-lg font-medium text-gray-600"><Loader /></div>
            </div>
        );
    }

    const discountedPrice = Math.round(detail.price - (detail.price * detail.discount) / 100);

    return (
        loader ?
            (
                <Loader />
            )
            :
            (<div className="px-6 py-10 bg-gray-100 min-h-screen">
                <div className="max-w-5xl mx-auto bg-white shadow-md rounded-xl p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Product Image */}
                    <div className="relative">
                        <img
                            src={detail.image}
                            alt={detail.title}
                            className="w-full h-96 object-contain bg-white rounded-lg shadow"
                        />

                        <span className="absolute top-4 left-4 bg-blue-600 text-white text-sm px-3 py-1 rounded-full font-medium">
                            Batch No: {detail.batchNo}
                        </span>
                    </div>

                    {/* Product Info */}
                    <div className="flex flex-col justify-between">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-800 mb-2">{detail.title}</h2>

                            <div className="flex items-center gap-2 mb-4">
                                <span className="text-2xl text-green-600 font-bold">Rs {discountedPrice}</span>
                                <span className="text-sm line-through text-gray-400">Rs {detail.price}</span>
                                <span className="text-sm text-red-600">({detail.discount}% OFF)</span>
                            </div>

                            <p className="text-gray-700 mb-4">{detail.description}</p>

                            <div className="flex items-center gap-3 mb-2">
                                <Landmark size={18} className="text-blue-600" />
                                <span className="text-sm text-gray-600">
                                    <strong>Company:</strong> {detail.company}
                                </span>
                            </div>

                            <div className="flex items-center gap-3 mb-2">
                                <PackageSearch size={18} className="text-purple-600" />
                                <span className="text-sm text-gray-600">
                                    <strong>Category:</strong> {detail.category}
                                </span>
                            </div>

                            <div className="flex items-center gap-3 mb-4">
                                {getStatusIcon(detail.status)}
                                <span className="text-sm text-gray-600">
                                    <strong>Status:</strong> {detail.status}
                                </span>
                            </div>
                        </div>

                        <button
                            className=" w-full bg-blue-600 max-sm:mt-3 cursor-pointer text-white py-3 rounded-lg text-sm font-medium flex justify-center items-center gap-2 hover:bg-blue-700 active:scale-95 transition-all duration-150"
                            onClick={() => navigate(-1)}
                        >
                            Go Back
                        </button>
                    </div>
                </div>
            </div>
            )
    );
};

export default ProductDetail;

