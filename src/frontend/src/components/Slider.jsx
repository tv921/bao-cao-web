import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

const Slider = () => {
  // Dữ liệu ảnh laptop
  const laptopImages = [
    { image: '/img/img1.webp' },
    { image: '/img/img2.webp' },
    { image: '/img/img3.webp' },
  ];

  console.log(laptopImages);  // Kiểm tra xem mảng có được định nghĩa đúng không

  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      navigation
      pagination={{ clickable: true }}
      autoplay={{ delay: 3000 }}  // Tự động chuyển mỗi 3 giây
      loop
      spaceBetween={30}           // Khoảng cách giữa các slide
      centeredSlides={true}      // Đặt slide hiện tại vào giữa
      speed={600}                // Tốc độ chuyển slide
      className="max-w-6xl mx-auto my-8 px-4"
    >
      {laptopImages.map((laptop, index) => (
        <SwiperSlide key={index} className="flex justify-center">
          <img
            src={laptop.image}
            alt={`Laptop ${index + 1}`}
            className="w-full h-auto object-cover"  // Điều chỉnh kích thước ảnh
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Slider;


