import React, { useState } from 'react';
import axios from 'axios';
import { AppRoutes } from '../../constant/constant';

const TrackOrder = () => {
    const [trackingId, setTrackingId] = useState('');
    const [order, setOrder] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleTrack = async () => {
        setLoading(true);
        setError('');
        setOrder(null);

        try {
            const res = await axios.get(`${AppRoutes.trackorder}?trackingId=${trackingId}`);
            setOrder(res.data.data);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to track order');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white shadow-xl mt-10 rounded-xl">
            <h2 className="text-2xl font-bold mb-4 text-blue-700">📦 Track Your Order</h2>

            <div className="flex gap-2 mb-4">
                <input
                    type="text"
                    value={trackingId}
                    onChange={(e) => setTrackingId(e.target.value)}
                    placeholder="Enter Tracking ID"
                    className="border border-gray-300 rounded px-4 py-2 w-full"
                />
                <button
                    onClick={handleTrack}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    {loading ? "Tracking..." : "Track"}
                </button>
            </div>

            {error && <p className="text-red-600">No Order Found Against Tracking Id</p>}

            {order ? (
                (order.status === "Accepted" || order.status === "Delivered") ? (
                    <div className="mt-6 space-y-4">
                        <div className="bg-gray-100 p-4 rounded">
                            <p><span className="font-semibold">Tracking ID:</span> {order.trackingId}</p>
                            <p><span className="font-semibold">Status:</span> {order.status}</p>
                            <p><span className="font-semibold">Delivered By:</span> {order.deliveryman}</p>
                            <p><span className="font-semibold">Delivery Charges:</span> Rs {order.fee}</p>
                            <p><span className="font-semibold">Placed On:</span> {new Date(order.createdAt).toLocaleString()}</p>
                            {
                                order?.status === "Delivered" ?
                                    <p><span className="font-semibold">Delivered On:</span> {new Date(order.updatedAt).toLocaleString()}</p>
                                    :
                                    null
                            }
                        </div>

                        <div className="bg-gray-100 p-4 rounded">
                            <h3 className="text-lg font-semibold mb-2">🛍️ Ordered Items</h3>
                            {order.items.map((item, index) => (
                                <div key={index} className="flex items-center gap-4 mb-4 border-b pb-3">
                                    <img
                                        src={item.image}
                                        alt={item.productName}
                                        className="w-16 h-16 rounded border"
                                    />
                                    <div>
                                        <p className="font-semibold">{item.productName}</p>
                                        <p>Quantity: {item.quantity}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <p className="text-yellow-600 text-lg font-semibold mt-4">No order found or order not accepted yet.</p>
                )
            ) : null}
        </div>
    );
};

export default TrackOrder;
