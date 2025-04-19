import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppRoutes } from '../../constant/constant';
import {
    User,
    Mail,
    Phone,
    IdCard,
    MapPin,
    ShieldCheck,
    Calendar,
    Clock,
    UserCheck,
    ArrowLeft
} from 'lucide-react';
import Loader from '../../components/Home/Loading';

const UserDetail = () => {
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        getUser();
    }, []);

    const getUser = async () => {
        try {
            const res = await axios.get(`${AppRoutes.allusers}/${id}`);
            setUser(res.data.data);
        } catch (err) {
            console.error("Failed to fetch user", err);
        }
    };

    if (!user) return <div className="p-6"><Loader/></div>;

    return (
        <div className="p-6 max-w-2xl mx-auto bg-white shadow-lg rounded-xl">
            <ArrowLeft className=' cursor-pointer' onClick={()=> navigate(-1)}/>
            <div className="flex flex-col items-center">
                <img
                    src={user.yourImage}
                    alt="User"
                    className="w-32 h-32 rounded-full object-cover shadow-md border-2 border-blue-600"
                />
                <h2 className="text-2xl font-bold mt-4">{user.fullname}</h2>
                <h2 className="text-sm mt-1 text-gray-500">{user._id}</h2>
                <p className={`mt-1 text-sm px-3 py-1 rounded-full font-medium 
                    ${user.accountStatus === 'approved' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {user.accountStatus}
                </p>
            </div>

            <div className="mt-6 space-y-4">
                <div className="flex items-center gap-3">
                    <Mail className="text-blue-600" size={20} />
                    <p className="text-gray-700">{user.email}</p>
                </div>
                <div className="flex items-center gap-3">
                    <Phone className="text-green-600" size={20} />
                    <p className="text-gray-700">{user.phoneNum}</p>
                </div>
                <div className="flex items-center gap-3">
                    <IdCard className="text-purple-600" size={20} />
                    <p className="text-gray-700">{user.cnicNum}</p>
                </div>
                <div className="flex items-center gap-3">
                    <MapPin className="text-red-500" size={20} />
                    <p className="text-gray-700">{user.address}</p>
                </div>
                <div className="flex items-center gap-3">
                    <ShieldCheck className="text-indigo-600" size={20} />
                    <p className="text-gray-700 capitalize">{user.role}</p>
                </div>
                <div className="flex items-center gap-3">
                    <Calendar className="text-yellow-600" size={20} />
                    <p className="text-gray-700">Registered: {new Date(user.createdAt).toLocaleDateString()}</p>
                </div>
                <div className="flex items-center gap-3">
                    <Clock className="text-gray-500" size={20} />
                    <p className="text-gray-700">Last Updated: {new Date(user.updatedAt).toLocaleString()}</p>
                </div>
            </div>
        </div>
    );
};

export default UserDetail;
