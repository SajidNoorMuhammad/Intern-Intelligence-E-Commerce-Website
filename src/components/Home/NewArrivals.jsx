import React from 'react';

const NewArrivals = () => {
    const images = [
        "/Images/Arrivals/one.webp",
        "/Images/Arrivals/two.webp",
        "/Images/Arrivals/three.webp",
        "/Images/Arrivals/four.webp",
        "/Images/Arrivals/five.webp",
        "/Images/Arrivals/six.webp",
        "/Images/Arrivals/seven.webp",
        "/Images/Arrivals/eight.webp",
        "/Images/Arrivals/nine.webp",
        "/Images/Arrivals/ten.webp",
        "/Images/Arrivals/eleven.webp",
        "/Images/Arrivals/twelve.webp",

    ];

    return (
        <div className="py-2 mt-10 px-4 ">
            <h2 className="text-3xl font-bold mb-4 text-blue-700">New Arrivals</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
                {images.map((img, idx) => (
                    <div
                        key={idx}
                        className="flex items-center justify-center rounded-full transition duration-300"
                    >
                        <img
                            src={img}
                            alt={`Arrival ${idx + 1}`}
                            className="w-32 h-32 object-contain mb-10 rounded-full hover:scale-105 transition-transform duration-300"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NewArrivals;
