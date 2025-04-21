import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { AppRoutes } from '../../constant/constant';
import { Eye, Edit, Trash2, Download } from 'lucide-react';
import { toast, ToastContainer } from 'react-toastify';

const AllOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [updatedStatus, setUpdatedStatus] = useState('');
    const [fee, setFee] = useState(Number);
    const [delivery, setDelivery] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [viewOrder, setViewOrder] = useState(null); // For showing order in view modal
    console.log(viewOrder)

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const res = await axios.get(AppRoutes.allorders);
            if (Array.isArray(res.data.data)) {
                setOrders(res.data.data);
                console.log(res);
            } else {
                setOrders([]);
            }
        } catch (err) {
            console.error('Error fetching orders:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateClick = (order) => {
        setSelectedOrder(order);
        setUpdatedStatus(order.status);
        setShowModal(true);
    };

    const handleUpdateStatus = async () => {
        try {
            await axios.put(`${AppRoutes.updateorder}/${selectedOrder._id}`, {
                status: updatedStatus,
                fee,
                deliveryman: delivery
            });
            toast.success(`Order Status Changed to ${updatedStatus} Successfully`);
            fetchOrders();
            setShowModal(false);
        } catch (err) {
            console.error('Update failed', err);
            toast.error("Unable to Change Status");
        }
    };

    const handleDeleteOrder = async (id) => {
        try {
            await axios.delete(`${AppRoutes.deleteorders}/${id}`);
            toast.success("Order Deleted Successfully");
            fetchOrders();
        } catch (err) {
            console.error('Delete failed', err);
            toast.error("Unable to Delete Order")
        }
    };

    const handleDownload = (order) => {
        const orderDetails = `
Order ID: ${order._id}
Tracking ID: ${order.trackingId}
Status: ${order.status}
Created At: ${new Date(order.createdAt).toLocaleString()}
Updated At: ${new Date(order.updatedAt).toLocaleString()}
Traking: ${<div><img src={order.trackingIdImage} alt="" /></div>}
        `;

        const blob = new Blob([orderDetails], { type: 'text/plain;charset=utf-8' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `Order-${order._id}.txt`;
        link.click();
        toast.success("Order Downloaded Successfully");
    };

    const filteredOrders = orders.filter((order) =>
        order?.trackingId?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="p-6">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">All Orders</h2>

            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Search by Tracking ID..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="border px-3 py-2 rounded w-full max-w-sm"
                />
            </div>

            {loading ? (
                <p className="text-gray-500">Loading orders...</p>
            ) : (
                <div className="overflow-x-auto bg-white shadow-lg rounded-xl">
                    <table className="min-w-full divide-y divide-gray-200 text-sm">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-4 py-3 text-left font-semibold text-gray-600">Order ID</th>
                                <th className="px-4 py-3 text-left font-semibold text-gray-600">Created</th>
                                <th className="px-4 py-3 text-left font-semibold text-gray-600">Updated</th>
                                <th className="px-4 py-3 text-left font-semibold text-gray-600">Tracking ID</th>
                                <th className="px-4 py-3 text-left font-semibold text-gray-600">Status</th>
                                <th className="px-4 py-3 text-left font-semibold text-gray-600">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {filteredOrders.map((order) => (
                                <tr key={order._id} className="hover:bg-gray-50 transition">
                                    <td className="px-4 py-3">{order._id.slice(-6)}</td>
                                    <td className="px-4 py-3">{new Date(order.createdAt).toLocaleString()}</td>
                                    <td className="px-4 py-3">{new Date(order.updatedAt).toLocaleString()}</td>
                                    <td className="px-4 py-3 font-mono text-blue-600">{order.trackingId}</td>
                                    <td className="px-4 py-3">
                                        <span
                                            className={`inline-block px-2 py-1 rounded-full text-white text-sm font-semibold ${order.status === 'Pending'
                                                ? 'bg-yellow-500'
                                                : order.status === 'Delivered'
                                                    ? 'bg-green-600'
                                                    : order.status === 'Out for Delivery'
                                                        ? 'bg-blue-600'
                                                        : order.status === 'Accepted'
                                                            ? 'bg-rose-600'
                                                            : order.status === 'Cancelled'
                                                                ? 'bg-red-600'
                                                                : 'bg-gray-600'
                                                }`}
                                        >
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 flex items-center gap-3">
                                        <Eye
                                            size={18}
                                            className="text-blue-600 hover:scale-110 cursor-pointer transition"
                                            onClick={() => setViewOrder(order)}
                                        />
                                        <Edit
                                            size={18}
                                            className="text-green-600 hover:scale-110 cursor-pointer transition"
                                            onClick={() => handleUpdateClick(order)}
                                        />
                                        <Trash2
                                            size={18}
                                            className="text-red-600 hover:scale-110 cursor-pointer transition"
                                            onClick={() => handleDeleteOrder(order._id)}
                                        />
                                        <Download
                                            size={18}
                                            className="text-indigo-600 hover:scale-110 cursor-pointer transition"
                                            onClick={() => handleDownload(order)}
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
                        <h3 className="text-lg font-semibold mb-4 text-gray-800">Update Order Status</h3>
                        <select
                            value={updatedStatus}
                            onChange={(e) => setUpdatedStatus(e.target.value)}
                            className="w-full border border-gray-300 rounded px-3 py-2 mb-4 text-gray-700"
                        >
                            <option value="Pending">Pending</option>
                            <option value="Delivered">Delivered</option>
                            <option value="Out for Delivery">Out for Delivery</option>
                            <option value="Accepted">Accepted</option>
                            <option value="Cancelled">Cancelled</option>
                        </select>


                        <select
                            value={fee}
                            onChange={(e) => setFee(e.target.value)}
                            className="w-full border border-gray-300 rounded px-3 py-2 mb-4 text-gray-700"
                        >
                            <option value="pending">Select Fee</option>
                            <option value="100">100</option>
                            <option value="150">150</option>
                            <option value="200">200</option>
                            <option value="300">300</option>
                            <option value="500">500</option>
                        </select>

                        <select
                            value={delivery}
                            onChange={(e) => setDelivery(e.target.value)}
                            className="w-full border border-gray-300 rounded px-3 py-2 mb-4 text-gray-700"
                        >
                            <option value="pending">Select Rider</option>
                            <option value="Muhammad-Asad">Muhammad Asad</option>
                            <option value="Kamran">Kamran</option>
                            <option value="Adnan">Adnan</option>
                            <option value="Haider">Haider</option>
                            <option value="Ali-Raza">Ali Raza</option>
                        </select>

                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setShowModal(false)}
                                className="px-4 py-2 text-sm bg-gray-300 rounded hover:bg-gray-400"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleUpdateStatus}
                                className="px-4 py-2 text-sm bg-green-600 text-white rounded hover:bg-green-700"
                            >
                                Update
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {viewOrder && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 overflow-y-scroll overflow-auto">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl">
                        <h3 className="text-lg font-bold mb-4 text-gray-800 pt-60">Order Details</h3>
                        <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
                            <div>
                                <p><strong>Order ID:</strong> {viewOrder._id}</p>
                                <p><strong>Tracking ID:</strong> {viewOrder.trackingId}</p>
                                <p><strong>Status:</strong> {viewOrder.status}</p>
                                <p><strong>Fee:</strong> {viewOrder.fee || 'N/A'}</p>
                                <p><strong>Deliveryman:</strong> {viewOrder.deliveryman || 'N/A'}</p>
                                <p><strong>Created At:</strong> {new Date(viewOrder.createdAt).toLocaleString()}</p>
                                <p><strong>Updated At:</strong> {new Date(viewOrder.updatedAt).toLocaleString()}</p>
                            </div>
                            <div>
                                <p><strong>Customer Name:</strong> {viewOrder.userName || 'N/A'}</p>
                                <p><strong>Email:</strong> {viewOrder.userEmail || 'N/A'}</p>
                                <p><strong>Phone:</strong> {viewOrder.userNum || 'N/A'}</p>
                                <p><strong>Address:</strong> {viewOrder.userAddress}</p>
                            </div>
                        </div>

                        {viewOrder.trackingIdImage && (
                            <div className="mt-4">
                                <p><strong>Tracking Image:</strong></p>
                                <img src={viewOrder.trackingIdImage} alt="Tracking" className="w-full h-auto rounded border" />
                            </div>
                        )}

                        {viewOrder.items?.length > 0 && (

                            <div className="mt-6">
                                <h4 className="text-md font-semibold mb-2 text-gray-800">Ordered Items</h4>
                                <table className="w-full text-left border rounded">
                                    <thead className="bg-gray-100">
                                        <tr>
                                            <th className="px-3 py-2">Item</th>
                                            <th className="px-3 py-2">Qty</th>
                                            <th className="px-3 py-2">Price</th>
                                            <th className="px-3 py-2">Disc</th>
                                            <th className="px-3 py-2">After Disc</th>
                                            <th className="px-3 py-2">Saved</th>
                                            <th className="px-3 py-2">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {/* Calculate total outside the loop */}
                                        {(() => {
                                            const calculatedTotal = viewOrder.items.reduce((sum, item) => {
                                                const discount = item.discount || 0;
                                                const discountedPrice = item.price - (item.price * discount) / 100;
                                                return sum + discountedPrice * item.quantity;
                                            }, 0);

                                            return (
                                                <>
                                                    {viewOrder.items.map((item, idx) => (
                                                        <tr key={idx} className="border-t">
                                                            <td className="px-3 py-2">{item.productName}</td>
                                                            <td className="px-3 py-2">{item.quantity}</td>
                                                            <td className="px-3 py-2">{item.price}</td>
                                                            <td className="px-3 py-2">{item.discount}%</td>
                                                            <td className="px-3 py-2">
                                                                {(item.price - (item.price * item.discount / 100)).toFixed(2)}
                                                            </td>
                                                            <td className="px-4 py-3 text-green-600 font-medium">
                                                                {(item.price * item.discount / 100).toFixed(2)}
                                                            </td>
                                                            <td>
                                                                <span className='bg-green-600 text-white px-3 py-1 rounded-full text-xs font-medium'>Accepted</span>
                                                            </td>
                                                        </tr>
                                                    ))}

                                                    {/* Total Row */}
                                                    <tr className="border-t font-semibold bg-gray-100">
                                                        <td colSpan="6" className="px-3 py-2 text-right">Total:</td>
                                                        <td className="px-3 py-2">
                                                            Rs. {(calculatedTotal + Number(viewOrder.fee || 0)).toFixed(2)}
                                                        </td>
                                                    </tr>
                                                </>
                                            );
                                        })()}
                                    </tbody>

                                </table>
                            </div>
                        )}

                        <div className="flex justify-end mt-6">
                            <button
                                onClick={() => setViewOrder(null)}
                                className="px-4 py-2 text-sm bg-gray-300 rounded hover:bg-gray-400"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}


            <ToastContainer position='top-right' autoClose={3000} />
        </div>
    );
};

export default AllOrders;
