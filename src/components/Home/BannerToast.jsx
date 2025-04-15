// components/BannerToast.jsx
import React from 'react';

const BannerToast = ({ message }) => {
    return (
        <div className={`fixed top-5 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-500 ${show ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'} pointer-events-none`}>
            <div className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg font-semibold text-sm">
                ✅ {message}
            </div>
        </div>
    );
};

export default BannerToast;
