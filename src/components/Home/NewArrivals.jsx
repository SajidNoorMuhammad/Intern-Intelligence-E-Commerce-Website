import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

const NewArrivals = () => {
    const [isMobile, setIsMobile] = useState(false);

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

    useEffect(() => {
        const checkScreenSize = () => {
            setIsMobile(window.innerWidth < 640); // Tailwind's sm
        };

        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);
        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);

    return (
        <div className="py-2 mt-10 px-4 max-sm:mb-0 max-sm:pb-0">
            <h2 className="text-3xl font-bold mb-4 text-blue-700">New Arrivals</h2>

            {isMobile ? (
                <Swiper
                    modules={[Autoplay]}
                    spaceBetween={10}
                    slidesPerView={2}
                    autoplay={{ delay: 2000, disableOnInteraction: false }}
                    loop={true}
                    className="mb-10"
                >
                    {images.map((img, idx) => (
                        <SwiperSlide key={idx}>
                            <img
                                src={img}
                                alt={`Arrival ${idx + 1}`}
                                className="w-32 h-32 object-contain rounded-full mx-auto hover:scale-105 transition-transform duration-300"
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            ) : (
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
            )}
        </div>
    );
};

export default NewArrivals;
