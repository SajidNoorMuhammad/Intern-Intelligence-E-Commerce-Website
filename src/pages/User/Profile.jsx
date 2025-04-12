import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import {
    Mail,
    Phone,
    MapPin,
    BadgeCheck,
    UserCircle2,
    IdCard,
    ShieldCheck
} from 'lucide-react';

const Profile = () => {
    const { user } = useContext(AuthContext);

    if (!user) {
        return <div className="text-center mt-10 text-lg">Loading profile...</div>;
    }

    return (
        <div className="max-w-3xl mx-auto px-4 py-10">
            <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">My Profile</h1>

            <div className="bg-white shadow-xl rounded-xl p-6">
                <div className="flex flex-col items-center mb-6">
                    <img
                        src={user?.yourImage}
                        alt="User"
                        className="w-32 h-32 rounded-full object-cover border-4 border-blue-500 shadow-md"
                    />
                    <h2 className="text-xl font-semibold mt-4 flex items-center gap-2">
                        <UserCircle2 className="w-5 h-5 text-blue-500" />
                        {user?.fullname}
                    </h2>
                    <p className="text-sm text-gray-600 flex items-center gap-1">
                        <Mail className="w-4 h-4" />
                        {user?.email}
                    </p>
                    <p className="mt-1 text-sm flex items-center gap-1 text-green-600 font-medium">
                        <BadgeCheck className="w-4 h-4" />
                        {user?.accountStatus}
                    </p>
                </div>

                {/* Additional Info */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-gray-800">
                    <div className="flex items-start gap-3">
                        <Phone className="mt-1 text-blue-600" />
                        <div>
                            <h4 className="font-medium">Phone Number</h4>
                            <p>{user?.phoneNum}</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <IdCard className="mt-1 text-blue-600" />
                        <div>
                            <h4 className="font-medium">CNIC Number</h4>
                            <p>{user?.cnicNum}</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <MapPin className="mt-1 text-blue-600" />
                        <div>
                            <h4 className="font-medium">Address</h4>
                            <p>{user?.address}</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <ShieldCheck className="mt-1 text-blue-600" />
                        <div>
                            <h4 className="font-medium">Role</h4>
                            <p className="capitalize">{user?.role}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
