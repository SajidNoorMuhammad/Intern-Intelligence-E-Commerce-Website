import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useContext, useState } from 'react';
import { FiMenu } from 'react-icons/fi';
import { IoClose } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext';
import { LogOutIcon } from 'lucide-react';

const AdminHeader = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { user, setUser } = useContext(AuthContext);

    const handleLogout = () => {
        Cookies.set("token", "");
        setUser("");
        navigate('/login');
    }

    return (
        <>
            {/* Header */}
            <header className="bg-gray-900 text-white px-6 py-4 flex justify-between items-center shadow-md">
                <h1 className="text-xl font-bold">Admin Panel</h1>
                <div className=' flex items-center gap-3'>
                    <img className="w-12 h-12 rounded-full ml-4 border-2 border-white" src={user?.yourImage} alt="" />
                    <p>{user?.email}</p>
                    <button onClick={() => setIsOpen(true)} className="text-white text-2xl">
                        <FiMenu />
                    </button>
                </div>

            </header>

            {/* Sidebar Dialog with Transition */}
            <Transition show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-50" onClose={() => setIsOpen(false)}>
                    <Transition.Child
                        as={Fragment}
                        enter="transition-opacity duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition-opacity duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 backdrop-blur-sm bg-opacity-40" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-hidden">
                        <div className="absolute inset-0 overflow-hidden">
                            <div className="fixed inset-y-0 left-0 flex max-w-full">
                                <Transition.Child
                                    as={Fragment}
                                    enter="transform transition ease-in-out duration-300"
                                    enterFrom="-translate-x-full"
                                    enterTo="translate-x-0"
                                    leave="transform transition ease-in-out duration-200"
                                    leaveFrom="translate-x-0"
                                    leaveTo="-translate-x-full"
                                >
                                    <Dialog.Panel className="w-64 bg-white shadow-xl p-5">
                                        <div className="flex justify-between items-center mb-6">
                                            <h2 className="text-xl font-semibold">Admin Menu</h2>
                                            <button onClick={() => setIsOpen(false)} className="text-gray-700 text-2xl">
                                                <IoClose />
                                            </button>
                                        </div>

                                        <nav className="flex flex-col gap-4 text-gray-800">
                                            <Link to="/admin/dashboard" className="hover:text-blue-600">📊 Dashboard</Link>
                                            <Link to="/admin/addproducts" className="hover:text-blue-600">➕ Add Products</Link>
                                            <Link to="/admin/allproducts" className="hover:text-blue-600">🛒 Products</Link>
                                            <Link to="/admin/addusers" className="hover:text-blue-600">➕ Add User</Link>
                                            <Link to="/admin/allusers" className="hover:text-blue-600">👥 Users</Link>
                                            <Link to="/admin/allorders" className="hover:text-blue-600">📦 Orders</Link>
                                            <Link to="/admin/profile" className="hover:text-blue-600">🧑 My Profile</Link>
                                            <Link to="/admin/cart" className="hover:text-blue-600">🛒 Cart</Link>
                                            <Link to="/admin/settings" className="hover:text-blue-600">⚙️ Settings</Link>
                                            <button onClick={handleLogout} className=' flex items-center bg-red-600 text-white font-bold rounded-md p-2 gap-2'><LogOutIcon /> LogOut</button>
                                        </nav>
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
};

export default AdminHeader;
