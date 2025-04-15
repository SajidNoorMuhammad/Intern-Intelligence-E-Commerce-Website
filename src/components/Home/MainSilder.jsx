import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";

const MainSilder = () => {
    const images = [
        "/Images/swipe1.webp",
        "/Images/swipe2.webp",
        "/Images/swipe3.webp",
        "/Images/swipe4.webp",
        "/Images/swipe5.webp",
        "/Images/swipe6.jpg",
        "/Images/swipe7.jpg",
        "/Images/swipe8.jpg",
        "/Images/swipe9.jpg",
        "/Images/swipe10.jpg",
        "/Images/swipe11.jpg",
        "/Images/swipe12.jpg",
        "/Images/swipe13.jpg",
        "/Images/swipe14.jpg",

    ];
    return (
        <div >
            <Swiper
                modules={[Autoplay]}
                spaceBetween={10}
                slidesPerView={1}
                autoplay={{ delay: 2000, disableOnInteraction: false }}
                loop={true}
                className=""
            >
                {images.map((src, index) => (
                    <SwiperSlide key={index}>
                        <img src={src} alt={`Slide ${index}`} className="w-full max-sm:w-[100%] max-sm:h-[200px] h-100 rounded-lg" />
                    </SwiperSlide>
                ))}
            </Swiper>

        </div>
    )
}

export default MainSilder;
