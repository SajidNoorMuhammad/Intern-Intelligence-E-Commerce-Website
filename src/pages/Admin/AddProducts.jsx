import React, { useState } from 'react';
import axios from 'axios';
import { UploadCloud } from 'lucide-react';
import { AppRoutes } from '../../constant/constant';

const AddProduct = () => {
    const [formData, setFormData] = useState({
        title: '',
        category: '',
        description: '',
        company: '',
        price: '',
        discount: '',
    });

    const [image, setImage] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!image) {
            alert('Please upload an image!');
            return;
        }

        const productData = new FormData();
        productData.append('title', formData.title);
        productData.append('category', formData.category);
        productData.append('description', formData.description);
        productData.append('company', formData.company);
        productData.append('price', formData.price);
        productData.append('discount', formData.discount);
        productData.append('image', image);

        try {
            const res = await axios.post(AppRoutes.addproducts, productData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            alert('Product added successfully!');
            console.log(res.data);
            setFormData({
                title: '',
                category: '',
                description: '',
                company: '',
                price: '',
                discount: '',
            });
            setImage(null);
        } catch (err) {
            console.error(err);
            alert('Something went wrong!');
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-xl mt-10">
            <h2 className="text-2xl font-bold text-center text-blue-700 mb-6">➕ Add New Product</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Product Title"
                    required
                    className="w-full border px-4 py-2 rounded"
                />
                <input
                    type="text"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    placeholder="Category"
                    required
                    className="w-full border px-4 py-2 rounded"
                />
                <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="Company"
                    required
                    className="w-full border px-4 py-2 rounded"
                />
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Product Description"
                    required
                    rows="3"
                    className="w-full border px-4 py-2 rounded"
                />
                <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="Price (Rs)"
                    required
                    className="w-full border px-4 py-2 rounded"
                />
                <input
                    type="number"
                    name="discount"
                    value={formData.discount}
                    onChange={handleChange}
                    placeholder="Discount (%)"
                    required
                    className="w-full border px-4 py-2 rounded"
                />
                <div className="flex items-center gap-3">
                    <label className="text-sm text-gray-600 font-medium">Upload Image:</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        required
                        className="text-sm"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2"
                >
                    <UploadCloud size={18} />
                    Add Product
                </button>
            </form>
        </div>
    );
};

export default AddProduct;
