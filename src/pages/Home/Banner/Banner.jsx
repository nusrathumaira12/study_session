import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

// Background images
import bannerBg1 from '../../../assets/banner1.jpg';
import bannerBg2 from '../../../assets/banner2.jpg';
import bannerBg3 from '../../../assets/banner3.jpg';

const Banner = () => {
  const slides = [
    {
      image: bannerBg1,
      title: 'Empowering Collaborative Learning with BrainBuddy',
      description:
        'Connect students, tutors, and administrators in one platform to schedule sessions, share resources, and manage learning effortlessly—built for modern education.',
      button: 'Get Started',
    },
    {
      image: bannerBg2,
      title: 'Study Smarter, Together — Welcome to BrainBuddy',
      description:
        'A smart and social platform where learners and tutors collaborate, share, and grow. Plan sessions, access materials, and stay connected—all in one place.',
      button: 'Join the Community',
    },
    {
      image: bannerBg3,
      title: 'Your All-in-One Study Companion',
      description:
        'BrainBuddy simplifies education by connecting students, tutors, and admins for seamless study session scheduling, resource sharing, and progress tracking.',
      button: 'Explore Features',
    },
  ];

  return (
    <Swiper
      modules={[Autoplay, Pagination]}
      loop={true}
      autoplay={{ delay: 2500, disableOnInteraction: false }}
      pagination={{ clickable: true }}
      className="h-[650px]"
    >
      {slides.map((slide, index) => (
        <SwiperSlide key={index}>
          <div
            className="h-full bg-cover bg-center flex items-center justify-center relative"
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            {/* Overlay */}
            <div className="absolute inset-0"></div>

            {/* Content */}
            <div className="relative z-10 text-center max-w-4xl px-6 py-8 bg-black/50 rounded-xl text-white shadow-xl">

              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                {slide.title}
              </h1>
              <p className="text-lg md:text-xl mb-6">{slide.description}</p>
              <button className="bg-blue-600 hover:bg-blue-700 transition px-6 py-3 rounded-full font-medium">
                {slide.button}
              </button>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Banner;
