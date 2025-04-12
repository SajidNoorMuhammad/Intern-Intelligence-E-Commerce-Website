import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';

const categoryImages = [
    "/Images/care.jpg",
    "/Images/freshstcafe.jpg",
    "/Images/groceries.jpg",
    "/Images/health.jpg",
    "/Images/kids-_-babies_2.00.jpg",
    "/Images/kitchen-appliances.jpg",
    "/Images/hair.jpg",
    "/Images/new-arrivals.gif",
];

const HotCategories = () => {
    return (
        <div className="my-6 px-4">
            <h2 className="text-3xl font-bold mb-4 text-blue-700">Hot Categories</h2>

            <Swiper
                modules={[Navigation, Autoplay]}
                spaceBetween={15}
                slidesPerView={2}
                autoplay={{ delay: 1500, disableOnInteraction: false }}
                breakpoints={{
                    640: { slidesPerView: 3 },
                    768: { slidesPerView: 4 },
                    1024: { slidesPerView: 6 },
                }}
            >
                {categoryImages.map((src, index) => (
                    <SwiperSlide key={index}>
                        <img
                            src={src}
                            alt={`Category ${index + 1}`}
                            className="w-full h-36 object-contain rounded-xl shadow-md hover:scale-105 transition duration-300"
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default HotCategories;
