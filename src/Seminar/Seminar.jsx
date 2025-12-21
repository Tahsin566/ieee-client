import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import '../Event/swiper.css';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { FaCalendar, FaLocationDot, FaClock, FaGoogleDrive, FaUser } from "react-icons/fa6";
import { SeminarCategories } from '../../data/categories.js';
import { Link } from 'react-router-dom';
import { dummySeminars, dummyFeaturedSeminar, dummyUpcomingSeminars } from './dummyData.js';
import { Plus } from 'lucide-react';
import { BASE_URL } from '../../constants.js';

const Seminar = () => {


    const [activeTab, setActiveTab] = useState("All");
    const [typeFilter, setTypeFilter] = useState("All");
    const [seminars, setSeminars] = useState([]);
    const [featuredSeminar, setFeaturedSeminar] = useState(dummyFeaturedSeminar);
    const [upcomingSeminars, setUpcomingSeminars] = useState(dummyUpcomingSeminars);
    const [loading, setLoading] = useState(false);

    useLayoutEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleCategoryFilter = (category) => {
        setActiveTab(category);
        let filtered = seminars;

        // Apply type filter first if not "All"
        if (typeFilter !== "All") {
            filtered = filtered.filter(s => s.type === typeFilter.toLowerCase());
        }

        // Apply category filter
        if (category !== "All") {
            filtered = filtered.filter(s => s.category === category.toLowerCase());
        }
        else if(category === "All"){
            getAllSlides()
        }

        setSeminars(filtered);
    };

    const handleTypeFilter = (type) => {
        setTypeFilter(type);
        setActiveTab("All");

        if (type === "All") {
            setSeminars(dummySeminars);
        } else {
            const filtered = dummySeminars.filter(s => s.type === type.toLowerCase());
            setSeminars(filtered);
        }
    };

    const handleDateFilter = (e) => {
        const date = e.target.value;
        if (date) {
            const selectedDate = new Date(date);
            const endDate = new Date(selectedDate);
            endDate.setDate(endDate.getDate() + 7);

            const filtered = seminars.filter(s => {
                const seminarDate = new Date(s.date);
                return seminarDate >= selectedDate && seminarDate <= endDate;
            });
            setSeminars(filtered);
        }
    };

    const getAllSlides = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${BASE_URL}/presentation`, {
                method: 'GET'
            });
            const data = await response.json();
            if (response.ok) {
                setSeminars(data.slides || []);
            }
        } catch (error) {
            console.error('Error fetching seminars:', error);
            toast.error('Failed to load seminars');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getAllSlides();
    }, []);

    if (loading && seminars.length === 0) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-black"></div>
            </div>
        );
    }

    return (
        <div className="font-roboto bg-white text-[#141d28] w-[90%] mx-auto">
            {/* Filter Section */}
            <section className="py-12">
                <div className="container mx-auto">
                    {/* Type Filter */}
                    <div className="flex flex-wrap gap-4 justify-center mb-6">
                        {/* {["All", "Seminar", "Webinar"].map((type, i) => (
                            <button
                                onClick={() => handleTypeFilter(type)}
                                key={i}
                                className={`px-6 py-2 rounded-lg font-semibold ${
                                    typeFilter === type
                                        ? 'bg-[#045C99] text-white'
                                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                } cursor-pointer transition-all`}
                            >
                                {type}
                            </button>
                        ))} */}
                    </div>

                    {/* Category Filter */}
                    <div className="flex flex-wrap gap-4 justify-center mb-8">
                        {[{ name: "All" }, ...SeminarCategories].map((item, i) => (
                            <button
                                onClick={() => handleCategoryFilter(item.name)}
                                key={i}
                                className={`px-4 py-2 rounded-lg ${activeTab === item.name
                                        ? 'bg-[#045C99] text-white'
                                        : 'bg-gray-700 text-white hover:bg-gray-600'
                                    } cursor-pointer transition-all`}
                            >
                                {item.name}
                            </button>

                        ))}
                        <input
                            type="date"
                            className="px-4 py-2 rounded-lg bg-white text-black border"
                            onChange={handleDateFilter}
                        />
                    </div>

                        {/* <a href='/addSeminar' className='bg-[#045C99] w-[200px] text-white px-4 py-2 rounded-lg flex items-center gap-2 mx-auto mb-20'><Plus size={20}></Plus>Slide</a> */}
                    {/* Seminars Grid */}
                    {seminars?.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {seminars.map((seminar, i) => (
                                <div
                                    key={i}
                                    className="bg-white p-4 rounded-2xl shadow-xl transition-transform duration-300 hover:scale-105 max-w-[480px]"
                                >
                                    <img
                                        src={seminar.thumbnail}
                                        alt={seminar.title}
                                        className="rounded-xl mb-4 w-full h-[200px] object-stretch"
                                    />
                                    <div className="flex gap-2 mb-2">
                                        <span className="text-xs uppercase px-2 py-1 bg-[#045C99] text-white font-semibold rounded-md inline-block">
                                            {seminar.slideType}
                                        </span>
                                        <span className="text-xs uppercase px-2 py-1 bg-gray-600 text-white font-semibold rounded-md inline-block">
                                            {seminar.category}
                                        </span>
                                    </div>
                                    <div className="text-sm text-gray-600 flex items-center gap-2 mb-2">
                                        <FaCalendar /> {new Date(seminar.date).toDateString()}
                                    </div>
                                    <h3 className="text-lg font-semibold mb-1">{seminar.title}</h3>
                                    <div className="flex items-center gap-2 mb-2">
                                        <FaClock className="text-gray-600" />
                                        <h3 className="text-sm">
                                            {parseInt(seminar.time.split(":")[0]) > 12
                                                ? parseInt(seminar?.time.split(":")[0]) - 12 + ":" + seminar.time.split(":")[1]
                                                : seminar.time}{" "}
                                            {parseInt(seminar.time.split(":")[0]) >= 12 ? 'PM' : 'AM'}
                                        </h3>
                                    </div>
                                    <p className="text-sm mb-2 line-clamp-2">{seminar?.description}</p>
                                    <div className="text-sm flex items-center gap-2 mb-2">
                                        <FaUser className="text-[#045C99]" />
                                        <span className="font-semibold">{seminar?.speakerName}</span>
                                    </div>
                                    <div className="text-xs text-gray-600 mb-2">
                                        {seminar?.speaker?.designation}
                                        {seminar?.speaker?.organization && ` • ${seminar?.speaker?.organization}`}
                                    </div>
                                    <div className="text-sm flex items-center gap-2 mb-4">
                                        <FaLocationDot /> {seminar?.location}
                                    </div>
                                    <div className="flex gap-3 flex-wrap">
                                        <Link
                                            to={`/seminar/${seminar?._id}`}
                                            className="flex-1 min-w-[140px] px-4 py-3 bg-[#045C99] text-white rounded-lg font-semibold text-center hover:bg-[#034a7a] transition-all shadow-md hover:shadow-lg transform hover:scale-105"
                                        >
                                            View Details
                                        </Link>
                                        {seminar?.drivelink && (
                                            <a
                                                href={seminar?.drivelink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex-1 min-w-[140px] px-4 py-3 bg-green-600 text-white rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-green-700 transition-all shadow-md hover:shadow-lg transform hover:scale-105"
                                            >
                                                <FaGoogleDrive className="text-lg" /> Materials
                                            </a>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-center text-2xl font-bold">No seminars/webinars found</p>
                    )}
                </div>
            </section>

            {/* Featured Section */}
            {/* {featuredSeminar && (
                <section className="py-12">
                    <div className="text-center">
                        <h1 className="text-3xl mb-4 font-extrabold">Featured {featuredSeminar.type}</h1>
                        <div className="max-w-4xl mx-auto">
                            <img
                                src={featuredSeminar.bannerImage}
                                alt={featuredSeminar.title}
                                className="mx-auto rounded-xl w-full object-cover mb-4"
                            />
                            <h2 className="text-2xl font-bold mb-2">{featuredSeminar.title}</h2>
                            <p className="text-lg text-gray-600 mb-4">{featuredSeminar.description}</p>
                            <div className="flex justify-center gap-4">
                                <Link
                                    to={`/seminar/${featuredSeminar._id}`}
                                    className="px-4 py-2 bg-[#045C99] text-white rounded-lg hover:bg-[#034a7a] transition-all"
                                >
                                    View Details
                                </Link>
                                {featuredSeminar.driveLink && (
                                    <a
                                        href={featuredSeminar.driveLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="px-4 py-2 bg-green-600 text-white rounded-lg flex items-center gap-2 hover:bg-green-700 transition-all"
                                    >
                                        <FaGoogleDrive /> Access Materials
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                </section>
            )} */}
        </div>
    );
};

export default Seminar;
