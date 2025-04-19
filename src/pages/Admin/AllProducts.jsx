import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { AppRoutes } from '../../constant/constant';
import { Eye, Ban, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const AllProducts = () => {
    const [products, setProducts] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [newStatus, setNewStatus] = useState('');

    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = async () => {
        try {
            const res = await axios.get(AppRoutes.adminproducts);
            setProducts(res?.data?.data || []);
        } catch (err) {
            console.log(err);
        }
    };

    const handleDelete = async (id) => {
        const res = await axios.delete(`${AppRoutes.deleteproduct}/${id}`);
        console.log(res);
        toast.success("Product Deleted Successfully");
    };

    const handleStatusToggle = (product) => {
        setSelectedProduct(product);
        setNewStatus(product.status);
        setShowModal(true);
    };

    const updateStatus = async () => {
        if (!selectedProduct) return;

        try {
            const res = await axios.put(`${AppRoutes.updateproduct}/${selectedProduct._id}`, {
                status: newStatus
            });

            const updatedProduct = res?.data?.data;

            // Update product list locally
            setProducts((prev) =>
                prev.map((p) =>
                    p._id === updatedProduct._id ? { ...p, status: updatedProduct.status } : p
                )
            );

            setShowModal(false);
            setSelectedProduct(null);
            toast.success("Product Updated Successfully");
        } catch (err) {
            console.error("Error updating status:", err);
        }
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-6">All Products</h2>

            <div className="overflow-x-auto">
                <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                    <thead className="bg-gray-100 text-gray-700">
                        <tr>
                            <th className="text-left px-6 py-3">Batch No</th>
                            <th className="text-left px-6 py-3">Image</th>
                            <th className="text-left px-6 py-3">Product Name</th>
                            <th className="text-left px-6 py-3">Added On</th>
                            <th className="text-left px-6 py-3">Status</th>
                            <th className="text-left px-6 py-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-700 divide-y divide-gray-200">
                        {products.map((product) => (
                            <tr key={product._id} className="hover:bg-gray-50 transition duration-150">
                                <td className="px-6 py-4">{product.batchNo}</td>
                                <td className="px-6 py-4">
                                    <img
                                        src={product.image}
                                        alt={product.title}
                                        className="w-16 h-16 object-cover rounded"
                                    />
                                </td>
                                <td className="px-6 py-4">{product.title}</td>
                                <td className="px-6 py-4">{new Date(product.createdAt).toLocaleDateString()}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-3 py-1 rounded-full text-xs font-medium 
                                        ${product.status === 'Available' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                        {product.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 flex gap-3 pt-10">
                                    <Link to={`/admin/allproducts/${product?._id}`} title="View Details"
                                        className="text-blue-600 hover:text-blue-800">
                                        <Eye size={18} />
                                    </Link>
                                    <button onClick={() => handleStatusToggle(product)} title="Change Status"
                                        className="text-yellow-600 hover:text-yellow-800">
                                        <Ban size={18} />
                                    </button>
                                    <button onClick={() => handleDelete(product._id)} title="Delete Product"
                                        className="text-red-600 hover:text-red-800">
                                        <Trash2 size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {products.length === 0 && (
                    <div className="text-center py-10 text-gray-500">No products found.</div>
                )}
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-3 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-80">
                        <h3 className="text-lg font-bold mb-4">Change Product Status</h3>

                        <select
                            value={newStatus}
                            onChange={(e) => setNewStatus(e.target.value)}
                            className="w-full p-2 border rounded mb-4"
                        >
                            <option value="Available">Available</option>
                            <option value="Out of Stock">Out of Stock</option>
                            <option value="Discontinued">Discontinued</option>
                        </select>

                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setShowModal(false)}
                                className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={updateStatus}
                                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                            >
                                Update
                            </button>
                        </div>
                    </div>
                </div>
            )}
            <ToastContainer position="top-right" autoClose={3000} />
        </div>
    );
};

export default AllProducts;
