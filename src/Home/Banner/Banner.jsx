import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import './styles.css';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../../constants';
import image from '../../../public/img/banner.png';


const Banner = ({events}) => {

    const navigate = useNavigate();

    return (


        <div className="relative mt-[0.5px] h-[400px] md:h-[500px] lg:h-[620px] overflow-hidden">
            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}

                className="mySwiper"
            >
                {events?.length > 0 ? events?.map((event, index) => (
                    <SwiperSlide key={index} className="">
                        <div className="absolute inset-0 z-30">

                            <img src={`${event?.image}`} alt={`IEEE Banner ${index + 1}`}
                                className=" h-[400px] md:h-[500px] lg:h-[600px] object-fit"
                                loading="lazy" />
                        </div>

                        
                        <div className="justify-center items-center text-center text-black px-4 z-20 absolute top-[100%] bg-red-600">
                            {/* <h2 className="text-5xl md:text-6xl font-bold font-['Roboto'] mb-4">
                                <span className="text-white text-sky-950 text-shadow-2xl text-shadow-sky-500">
                                    {event?.title}
                                    </span> 
                            </h2> */}
                            {/* <p className="text-lg mb-4 line-clamp-2 max-w-[60%]">{event?.description}</p> */}
                            {/* {event?.bannerType === "Event" ? <button className="px-2 py-2 bg-[#045C99] text-white rounded-lg z-20 cursor-pointer" onClick={() => navigate(`/event`)}>Go to events</button>:null}
                            {event?.bannerType === "Research" ? <button className="px-2 py-2 bg-[#045C99] text-white rounded-lg z-20 cursor-pointer" onClick={() => navigate(`/researchPapers`)}>Browse paper</button>:null}
                            {event?.bannerType === "Achievement" ? <button className="px-2 py-2 bg-[#045C99] text-white rounded-lg z-20 cursor-pointer" onClick={() => navigate(`/achievement`)}>View Achievements</button>:null}
                            {event?.bannerType === "Blog" ? <button className="px-2 py-2 bg-[#045C99] text-white rounded-lg z-20 cursor-pointer" onClick={() => navigate(`/blog`)}>Browse blog</button>:null}
                            {event?.bannerType === "News" ? <button className="px-2 py-2 bg-[#045C99] text-white rounded-lg z-20 cursor-pointer" onClick={() => navigate(`/news`)}>Browse news</button>:null}
                            {event?.bannerType === "Magazine" ? <button className="px-2 py-2 bg-[#045C99] text-white rounded-lg z-20 cursor-pointer" onClick={() => navigate(`/megazine`)}>Browse megazine</button>:null}
                            {event?.bannerType === "Gallery" ? <button className="px-2 py-2 bg-[#045C99] text-white rounded-lg z-20 cursor-pointer" onClick={() => navigate(`/gallery`)}>Browse gallery</button>:null} */}
                        </div>

                        

                    </SwiperSlide>
                )) : [
                    'No event at the moment'

                ].map((img, index) => (
                    <SwiperSlide key={index} className="relative text-white no-repeat flex">
                        <img src={`../../../public/img/${img}`} alt={img} className="w-[70px] h-[70px] object-cover" />
                    </SwiperSlide>
                ))}

            </Swiper>
        </div>

    )
};

export default Banner;