import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useContext, useState } from 'react';
import { FiMenu } from 'react-icons/fi';
import { IoClose } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext';

const AdminHeader = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { user } = useContext(AuthContext);

    return (
        <>
            {/* Header */}
            <header className="bg-gray-900 text-white px-6 py-4 flex justify-between items-center shadow-md">
                <h1 className="text-xl font-bold">Admin Panel</h1>
                <button onClick={() => setIsOpen(true)} className="text-white text-2xl">
                    <FiMenu />
                </button>
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
                                            <Link to="/admin/products" className="hover:text-blue-600">🛒 Products</Link>
                                            <Link to="/admin/orders" className="hover:text-blue-600">📦 Orders</Link>
                                            <Link to="/admin/users" className="hover:text-blue-600">👥 Users</Link>
                                            <Link to="/admin/settings" className="hover:text-blue-600">⚙️ Settings</Link>
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
