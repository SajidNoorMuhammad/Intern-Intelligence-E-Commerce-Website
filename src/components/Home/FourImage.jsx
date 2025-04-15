import React from 'react';

const FourImage = () => {
    return (
        <div className="w-full px-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                <img className="w-full rounded-sm object-cover max-sm:w-90" src="/Images/beauty/beauty1.png" alt="Beauty 1" />
                <img className="w-full rounded-sm object-cover max-sm:w-90" src="/Images/beauty/beauty2.jpg" alt="Beauty 2" />
                <img className="w-full rounded-sm object-cover max-sm:w-90" src="/Images/beauty/beauty3.jpg" alt="Beauty 3" />
                <img className="w-full rounded-sm object-cover max-sm:w-90" src="/Images/beauty/beauty5.png" alt="Beauty 4" />
            </div>
        </div>
    );
};

export default FourImage;
