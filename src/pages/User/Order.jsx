import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { AppRoutes } from '../../constant/constant';
import { AuthContext } from '../../context/AuthContext';
import Loader from '../../components/Home/Loading';

const Order = () => {
    const [loading, setLoading] = useState(true);
    const [orders, setOrders] = useState([]);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        const fetchUserOrder = async () => {
            try {
                setLoading(true);
                const response = await axios.get(AppRoutes.eachorder, {
                    params: { userId: user?._id }
                });
                setOrders(response?.data?.data || []);
                setLoading(false);
            } catch (err) {
                console.log(err);
                setLoading(false);
            }
        };

        if (user?._id) {
            fetchUserOrder();
        }
    }, [user]);

    if (loading) return <div className="text-center mt-10 text-lg font-medium"><Loader /></div>;

    return (
        <div className="max-w-7xl mx-auto mt-10 p-6">
            <h2 className="text-3xl font-semibold mb-6 text-center">Your Orders</h2>

            {orders.length === 0 ? (
                <p className="text-center text-gray-500">You have no orders yet.</p>
            ) : (
                <div className="space-y-6">
                    {orders.map((order) => {
                        // Compute total based on discounted item prices
                        const calculatedTotal = order.items.reduce((sum, item) => {
                            const discount = item.discount || 0;
                            const discountedPrice = item.price - (item.price * discount) / 100;
                            return sum + discountedPrice * item.quantity;
                        }, 0);

                        return (
                            <div key={order._id} className="bg-white p-6 rounded-lg shadow-lg">
                                {/* Order Header */}
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-xl font-semibold text-gray-800">
                                        Order ID: {(order._id).slice(-5)}
                                    </h3>
                                    <span className={`px-4 py-1 text-sm font-semibold rounded-full ${order.status === 'Pending' ? 'bg-yellow-200 text-yellow-800' : 'bg-green-200 text-green-800'}`}>
                                        {order.status}
                                    </span>
                                </div>

                                {/* Tracking ID Barcode */}
                                <div className="mb-4 text-center">
                                    <img
                                        src={order.trackingIdImage}
                                        alt="Order Barcode"
                                        className="mx-auto h-16"
                                    />
                                </div>

                                {/* Items List */}
                                <div className="space-y-4">
                                    {order.items.map((item, index) => {
                                        const discount = item.discount || 0;
                                        const discountedPrice = item.price - (item.price * discount) / 100;

                                        return (
                                            <div key={index} className="flex items-center gap-4 p-4 border-b">
                                                <img
                                                    src={item.image}
                                                    alt={item.productName}
                                                    className="w-16 h-16 object-cover rounded-md"
                                                />
                                                <div className="flex-1">
                                                    <h4 className="text-lg font-medium text-gray-800">{item.productName}</h4>
                                                    <p className="text-sm text-gray-600">
                                                        <strong>Original Price:</strong> Rs. {item.price} <br />
                                                        <strong>Discounted Price:</strong> Rs. {discountedPrice.toFixed(2)} <br />
                                                        <strong>Quantity:</strong> {item.quantity}
                                                    </p>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>

                                {/* Total */}
                                <div className="mt-4 text-right max-sm:text-right">
                                    <h3 className="text-lg flex justify-between font-semibold text-gray-800 max-sm:text-[16px]">
                                        <div>
                                            Total Amount (After Disc): Rs.
                                        </div>
                                        <div>
                                            {Math.round(calculatedTotal).toFixed(2)}
                                        </div>
                                    </h3>
                                    {
                                        order?.status === "Accepted" ?
                                            <div>
                                                <h3 className="text-lg flex justify-between font-semibold text-gray-800 max-sm:text-[16px]">
                                                    <div>
                                                        Delivery fee: Rs.
                                                    </div>
                                                    <div>
                                                        {order?.fee}/-
                                                    </div>
                                                </h3>
                                                <h3 className="text-lg font-semibold text-gray-800 max-sm:text-[16px] flex justify-between">
                                                    <div>
                                                        Total: Rs.
                                                    </div>
                                                    <div>
                                                        {Math.round(calculatedTotal) + Number(order?.fee)}/-
                                                    </div>
                                                </h3>
                                            </div>
                                            :
                                            null
                                    }
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default Order;
