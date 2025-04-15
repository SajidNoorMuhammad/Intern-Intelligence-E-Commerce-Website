import React from 'react';

const Collection = () => {
    const images = [
        "/Images/Collections/men.webp",
        "/Images/Collections/women.webp",
        "/Images/Collections/kids.webp",
        "/Images/Collections/footwear.webp",
        "/Images/Collections/beauty.webp",
        "/Images/Collections/home.webp",
    ];

    return (
        <div className="py-10 md:px-4 mr-[2%] bg-white">
            <h2 className="text-3xl font-bold mb-4 text-blue-700">Collections</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {images.map((img, idx) => (
                    <div
                        key={idx}
                        className="overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition duration-300"
                    >
                        <img
                            src={img}
                            alt={`Collection ${idx + 1}`}
                            className="w-full h-70 object-cover hover:scale-105 transition-transform duration-300"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Collection;
