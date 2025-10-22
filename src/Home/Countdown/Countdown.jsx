import React, { use, useEffect, useState } from 'react';
import { BASE_URL } from '../../../constants';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import CountDownItem from './countDownItem';

const Countdown = ({ banner }) => {

    return (
        <div>
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

                className="relative"
            >
                {
                    banner.map((banner, index) => (
                        <SwiperSlide className='relative' key={index}>
                            <CountDownItem banner={banner} />
                        </SwiperSlide>
                    ))
                }


            </Swiper>
        </div>
    );
};

export default Countdown;