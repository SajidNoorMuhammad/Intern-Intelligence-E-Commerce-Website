import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import { AppRoutes } from '../../constant/constant';
import { message } from 'antd';
import { Trash2 } from 'lucide-react';
import Loader from '../../components/Home/Loading';
import { toast, ToastContainer } from 'react-toastify';

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const { user } = useContext(AuthContext);

    useEffect(() => {
        if (user?._id) {
            fetchCartItems();
        }
    }, [user]);

    const fetchCartItems = async () => {
        try {
            setLoading(true);
            const response = await axios.get(AppRoutes.usercart, {
                params: { userId: user._id },
            });
            setCartItems(response?.data?.data || []);
            setLoading(false);
        } catch (err) {
            setError('Failed to load cart items.');
            setLoading(false);
        }
    };

    // Calculate total amount (after discount × quantity)
    const totalAmount = cartItems.reduce((acc, item) => {
        const discountedPrice = item.price - (item.price * item.discount) / 100;
        return acc + discountedPrice * item.quantity;
    }, 0);

    const deleteCartItem = async (itemId) => {
        try {
            const response = await axios.delete(`${AppRoutes.deletecart}/${itemId}`)
            toast.success("Product Removed From Cart Successfully");
            fetchCartItems();
        }
        catch (err) {
            toast.error("Unable to Removed from Cart");
        }
    }

    const handleOrderNow = async (itemId) => {
        try {
            const response = await axios.post(AppRoutes.oneorder, {
                userId: user?._id,
                itemId,
            });
            toast.success('Order Created Successfully');
            fetchCartItems();
        } catch (err) {
            toast.error("Unable to Create Order");
        }
    };

    const handleOrderAll = async () => {
        try {
            const response = await axios.post(AppRoutes.addorder, {
                userId: user._id,
                fullname: user.fullname,
                email: user.email,
                address: user.address,
                phoneNum: user.phoneNum
            });
            toast.success('All Items Order Created Successfully');
            console.log(response);
            fetchCartItems();

        } catch (err) {
            toast.error("Unable to Create Order");
        }
    };

    if (loading) return <div className="text-center mt-10 text-lg font-medium"><Loader /></div>;
    if (error) return <div className="text-center mt-10 text-red-500">{error}</div>;

    return (
        <div className="max-w-4xl mx-auto mt-10 p-4 ">
            <h2 className="text-3xl font-bold mb-6 text-center">Your Cart</h2>

            {cartItems.length === 0 ? (
                <p className="text-gray-500 text-center">Your cart is empty.</p>
            ) : (
                <>
                    <ul className="space-y-6">
                        {cartItems.map((item, index) => {
                            const discountedPrice = item.price - (item.price * item.discount) / 100;
                            return (
                                <li key={index} className="flex flex-col md:flex-row gap-4 pl-8 p-4 border rounded-lg shadow bg-white">
                                    <img
                                        src={item.image}
                                        alt={item.productName}
                                        className="w-32 h-32 object-cover rounded-md"
                                    />
                                    <div className="flex-1">
                                        <h3 className="text-xl font-semibold mb-1">{item.productName}</h3>
                                        <p className="text-gray-700 text-sm mb-1">
                                            <strong>Price:</strong> <span className=' line-through'>{item.price.toFixed(2)}</span>
                                        </p>
                                        <p className="text-gray-700 text-sm mb-1">
                                            <strong>Price after Discount:</strong> {discountedPrice.toFixed(2)}
                                        </p>
                                        <p className="text-gray-700 text-sm mb-1">
                                            <strong>Quantity:</strong> {item.quantity}
                                        </p>
                                        <p className="text-gray-500 text-xs">
                                            Added: {new Date(item.createdAt).toLocaleString()}
                                        </p>
                                    </div>
                                    <div className=' flex items-center gap-2'>
                                        <button
                                            className="rounded bg-red-500 p-3 text-white font-bold cursor-pointer"
                                            onClick={() => handleOrderNow(item._id)}
                                        >
                                            Order Now
                                        </button>
                                        <button
                                            className="rounded bg-red-500 p-3 text-white font-bold cursor-pointer"
                                            onClick={() => deleteCartItem(item._id)}
                                        >
                                            <Trash2 />
                                        </button>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>

                    {/* Total Amount Section */}
                    <div className="mt-8 p-4 border-t pt-4 text-right">
                        <h3 className="text-xl font-bold text-gray-800">
                            Total: Rs: {Math.round(totalAmount).toFixed(2)}
                        </h3>
                    </div>

                    {/* Order All Button */}
                    <div className="text-right pr-3">
                        <button
                            className="rounded bg-red-500 p-3 px-6 text-white font-bold cursor-pointer"
                            onClick={handleOrderAll}
                        >
                            Order All
                        </button>
                    </div>
                </>
            )}
            <ToastContainer position='top-right' autoClose={3000} />
        </div>
    );
};

export default Cart;
