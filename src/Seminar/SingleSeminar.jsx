import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaCalendar, FaLocationDot, FaClock, FaGoogleDrive, FaUser, FaBuilding, FaArrowLeft } from "react-icons/fa6";
import { dummySeminars } from './dummyData.js';

const SingleSeminar = () => {
    const { id } = useParams();
    const [singleSeminar, setSingleSeminar] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        window.scrollTo(0, 0);
        if (id) {
            // Simulate loading
            setLoading(true);
            setTimeout(() => {
                const seminar = dummySeminars.find(s => s._id === id);
                setSingleSeminar(seminar);
                setLoading(false);
            }, 300);
        }
    }, [id]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-black"></div>
            </div>
        );
    }

    if (!singleSeminar) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p className="text-2xl font-bold">Seminar not found</p>
            </div>
        );
    }

    const formatTime = (timeString) => {
        const [hours, minutes] = timeString.split(':');
        const hour = parseInt(hours);
        const ampm = hour >= 12 ? 'PM' : 'AM';
        const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
        return `${displayHour}:${minutes} ${ampm}`;
    };

    return (
        <div className="font-roboto bg-white text-[#141d28] min-h-screen">
            {/* Back Button */}
            <div className="w-[90%] mx-auto pt-8">
                <Link
                    to="/seminar"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition-all"
                >
                    <FaArrowLeft /> Back to Seminars
                </Link>
            </div>

            {/* Hero Section with Banner */}
            <section className="w-[90%] mx-auto mt-8">
                <div className="relative">
                    <img
                        src={singleSeminar.bannerImage}
                        alt={singleSeminar.title}
                        className="w-full h-[400px] md:h-[500px] object-cover rounded-2xl shadow-xl"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-8 rounded-b-2xl">
                        <div className="flex gap-2 mb-2">
                            <span className="text-xs uppercase px-3 py-1 bg-[#045C99] text-white font-semibold rounded-md">
                                {singleSeminar.type}
                            </span>
                            <span className="text-xs uppercase px-3 py-1 bg-white text-black font-semibold rounded-md">
                                {singleSeminar.category}
                            </span>
                            <span className={`text-xs uppercase px-3 py-1 font-semibold rounded-md ${
                                singleSeminar.status === 'upcoming' ? 'bg-yellow-500' :
                                singleSeminar.status === 'completed' ? 'bg-green-500' : 'bg-red-500'
                            } text-white`}>
                                {singleSeminar.status}
                            </span>
                        </div>
                        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                            {singleSeminar.title}
                        </h1>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <div className="w-[90%] mx-auto py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column - Details */}
                    <div className="lg:col-span-2">
                        {/* Description */}
                        <div className="bg-white p-6 rounded-xl shadow-lg mb-6">
                            <h2 className="text-2xl font-bold mb-4 text-[#045C99]">About this {singleSeminar.type}</h2>
                            <p className="text-lg text-gray-700 leading-relaxed whitespace-pre-line">
                                {singleSeminar.description}
                            </p>
                        </div>

                        {/* Event Details */}
                        <div className="bg-white p-6 rounded-xl shadow-lg">
                            <h2 className="text-2xl font-bold mb-4 text-[#045C99]">Event Details</h2>
                            <div className="space-y-4">
                                <div className="flex items-center gap-3 text-lg">
                                    <FaCalendar className="text-[#045C99] text-xl" />
                                    <div>
                                        <span className="font-semibold">Date:</span>{' '}
                                        {new Date(singleSeminar.date).toLocaleDateString('en-US', {
                                            weekday: 'long',
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })}
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 text-lg">
                                    <FaClock className="text-[#045C99] text-xl" />
                                    <div>
                                        <span className="font-semibold">Time:</span> {formatTime(singleSeminar.time)}
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 text-lg">
                                    <FaLocationDot className="text-[#045C99] text-xl" />
                                    <div>
                                        <span className="font-semibold">Location:</span> {singleSeminar.location}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Speaker & Actions */}
                    <div className="lg:col-span-1">
                        {/* Speaker Card */}
                        <div className="bg-white p-6 rounded-xl shadow-lg mb-6">
                            <h2 className="text-xl font-bold mb-4 text-[#045C99]">Speaker</h2>
                            {singleSeminar.speaker.photo && (
                                <img
                                    src={singleSeminar.speaker.photo}
                                    alt={singleSeminar.speaker.name}
                                    className="w-full h-48 object-cover rounded-lg mb-4"
                                />
                            )}
                            <div className="space-y-3">
                                <div className="flex items-start gap-3">
                                    <FaUser className="text-[#045C99] text-xl mt-1" />
                                    <div>
                                        <h3 className="font-bold text-lg">{singleSeminar.speaker.name}</h3>
                                        <p className="text-gray-600">{singleSeminar.speaker.designation}</p>
                                    </div>
                                </div>
                                {singleSeminar.speaker.organization && (
                                    <div className="flex items-start gap-3">
                                        <FaBuilding className="text-[#045C99] text-xl mt-1" />
                                        <p className="text-gray-700">{singleSeminar.speaker.organization}</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="bg-white p-6 rounded-xl shadow-lg space-y-3">
                            <h2 className="text-xl font-bold mb-4 text-[#045C99]">Actions</h2>
                            
                            {singleSeminar.driveLink && (
                                <a
                                    href={singleSeminar.driveLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full px-4 py-3 bg-green-600 text-white rounded-lg flex items-center justify-center gap-2 hover:bg-green-700 transition-all font-semibold"
                                >
                                    <FaGoogleDrive className="text-xl" /> Access Materials
                                </a>
                            )}
                            
                            {singleSeminar.status === 'upcoming' && singleSeminar.registrationLink && (
                                <a
                                    href={singleSeminar.registrationLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full px-4 py-3 bg-[#045C99] text-white rounded-lg flex items-center justify-center gap-2 hover:bg-[#034a7a] transition-all font-semibold"
                                >
                                    Register Now
                                </a>
                            )}

                            {singleSeminar.status === 'completed' && !singleSeminar.driveLink && (
                                <div className="w-full px-4 py-3 bg-gray-200 text-gray-600 rounded-lg text-center font-semibold">
                                    Event Completed
                                </div>
                            )}
                        </div>

                        {/* Info Box */}
                        <div className="bg-blue-50 border-l-4 border-[#045C99] p-4 rounded-lg mt-6">
                            <p className="text-sm text-gray-700">
                                {singleSeminar.driveLink 
                                    ? "Presentation slides and resources are available via Google Drive link above."
                                    : "Resources will be uploaded after the event."}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Subscribe Section */}
            <section className="w-[90%] mx-auto pb-12">
                <div className="bg-white border border-gray-200 shadow-xl rounded-2xl p-8">
                    <div className="text-center">
                        <h1 className="text-3xl font-bold mb-2">Want More?</h1>
                        <p className="font-semibold text-gray-600 mb-4">
                            Subscribe to our channel for recordings and upcoming events.
                        </p>
                        <div className="flex justify-center gap-4 flex-wrap">
                            <Link
                                to="/seminar"
                                className="bg-gray-700 px-6 py-3 rounded-lg text-white font-semibold hover:bg-gray-600 transition-all"
                            >
                                Browse More Events
                            </Link>
                            <a
                                href="https://www.youtube.com/@ieeecslusbchapter6574"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-[#045C99] px-6 py-3 rounded-lg text-white font-semibold hover:bg-[#034a7a] transition-all"
                            >
                                Subscribe on YouTube
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default SingleSeminar;
