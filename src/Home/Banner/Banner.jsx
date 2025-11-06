import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import './styles.css';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../../constants';
import image from '../../../public/img/banner.png';


const Banner = ({ events }) => {

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
                        <div className="absolute inset-0 z-10 flex items-center justify-center">

                            <img src={`${event?.image}`} alt={`IEEE Banner ${index + 1}`}
                                className="w-full h-[70%] object-cover"
                                loading="lazy" />
                        </div>


                        <div className="flex flex-col justify-center items-center text-center z-20 absolute bottom-10 md:bottom-24 lg:bottom-28 left-1/2 transform -translate-x-1/2 backdrop-blur-md bg-black/40 rounded-lg py-3 md:py-5 lg:py-6 px-6 md:px-12 lg:px-20 max-w-[100%] md:max-w-[85%] lg:max-w-[90%]">
                            <h2 className="text-xl md:text-4xl lg:text-5xl font-bold font-['Roboto'] mb-2 md:mb-4 lg:mb-5">
                                <span className="text-white">
                                    {event?.title}
                                </span>
                            </h2>
                            {event?.bannerType === "Event" ? <button className="px-4 py-2 md:px-6 md:py-3 lg:px-8 lg:py-3 bg-[#045C99] text-white text-sm md:text-lg lg:text-xl rounded-lg cursor-pointer hover:bg-[#034a7a] transition-colors" onClick={() => navigate(`/event`)}>Go to events</button> : null}
                            {event?.bannerType === "Research" ? <button className="px-4 py-2 md:px-6 md:py-3 lg:px-8 lg:py-3 bg-[#045C99] text-white text-sm md:text-lg lg:text-xl rounded-lg cursor-pointer hover:bg-[#034a7a] transition-colors" onClick={() => navigate(`/researchPapers`)}>Browse paper</button> : null}
                            {event?.bannerType === "Achievement" ? <button className="px-4 py-2 md:px-6 md:py-3 lg:px-8 lg:py-3 bg-[#045C99] text-white text-sm md:text-lg lg:text-xl rounded-lg cursor-pointer hover:bg-[#034a7a] transition-colors" onClick={() => navigate(`/achievement`)}>View Achievements</button> : null}
                            {event?.bannerType === "Blog" ? <button className="px-4 py-2 md:px-6 md:py-3 lg:px-8 lg:py-3 bg-[#045C99] text-white text-sm md:text-lg lg:text-xl rounded-lg cursor-pointer hover:bg-[#034a7a] transition-colors" onClick={() => navigate(`/blog`)}>Browse blog</button> : null}
                            {event?.bannerType === "News" ? <button className="px-4 py-2 md:px-6 md:py-3 lg:px-8 lg:py-3 bg-[#045C99] text-white text-sm md:text-lg lg:text-xl rounded-lg cursor-pointer hover:bg-[#034a7a] transition-colors" onClick={() => navigate(`/news`)}>Browse news</button> : null}
                            {event?.bannerType === "Magazine" ? <button className="px-4 py-2 md:px-6 md:py-3 lg:px-8 lg:py-3 bg-[#045C99] text-white text-sm md:text-lg lg:text-xl rounded-lg cursor-pointer hover:bg-[#034a7a] transition-colors" onClick={() => navigate(`/megazine`)}>Browse megazine</button> : null}
                            {event?.bannerType === "Gallery" ? <button className="px-4 py-2 md:px-6 md:py-3 lg:px-8 lg:py-3 bg-[#045C99] text-white text-sm md:text-lg lg:text-xl rounded-lg cursor-pointer hover:bg-[#034a7a] transition-colors" onClick={() => navigate(`/gallery`)}>Browse gallery</button> : null}
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