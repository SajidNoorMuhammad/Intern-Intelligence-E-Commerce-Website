import React from 'react';

const FourImage = () => {
    return (
        <div className="w-full px-2">
            <div className="flex gap-6">
                <img className="w-78 rounded-sm object-cover" src="/Images/beauty/beauty1.png" alt="Beauty 1" />
                <img className="w-78 rounded-sm object-cover" src="/Images/beauty/beauty2.jpg" alt="Beauty 2" />
                <img className="w-78 rounded-sm object-cover" src="/Images/beauty/beauty3.jpg" alt="Beauty 3" />
                <img className="w-78 rounded-sm object-cover" src="/Images/beauty/beauty5.png" alt="Beauty 4" />
            </div>
        </div>
    );
};

export default FourImage;
