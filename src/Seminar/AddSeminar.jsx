import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { FaCalendarAlt, FaClock, FaMapMarkerAlt, FaLink, FaImage, FaUser, FaBuilding } from 'react-icons/fa';
import { useUser } from '../../hooks/useUser';
import { useNavigate } from 'react-router-dom';
import { useSeminar } from '../../hooks/useSeminar';
import { BASE_URL } from '../../constants';

const AddSeminar = () => {
    const { loading: userLoading } = useUser();
    const { AddPresentation, loading } = useSeminar();
    const navigate = useNavigate();

    const [bannerPreview, setBannerPreview] = useState(null);
    const [speakerPhotoPreview, setSpeakerPhotoPreview] = useState(null);
    const [seminarType, setSeminarType] = useState('seminar');
    const [category, setCategory] = useState('technical');
    const [status, setStatus] = useState('upcoming');
    const [isFeatured, setIsFeatured] = useState(false);

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        speakerName: '',
        speakerDesignation: '',
        speakerOrganization: '',
        date: '',
        time: '',
        image: null,
        location: '',
        driveLink: '',
        registrationLink: ''
    });

    const seminarTypes = ['seminar', 'webinar'];
    const categories = ['technical', 'workshop', 'career', 'research', 'other'];
    const statuses = ['upcoming', 'completed', 'cancelled'];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleBannerChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData({ ...formData, image: file });
            const reader = new FileReader();
            reader.onloadend = () => {
                setBannerPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSpeakerPhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData({ ...formData, speakerPhoto: file });
            const reader = new FileReader();
            reader.onloadend = () => {
                setSpeakerPhotoPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.title || !formData.description || 
            !formData.speakerName || !formData.speakerDesignation || 
            !formData.date || !formData.time || !formData.location) {
            toast.error("Please fill all required fields");
            return;
        }

        const submitData = new FormData();
        submitData.append("title", formData.title);
        submitData.append("description", formData.description);
        submitData.append("speakerName", formData.speakerName);
        submitData.append("speakerDesignation", formData.speakerDesignation);
        submitData.append("speakerOrganization", formData.speakerOrganization);
        submitData.append("image", formData.image);
        submitData.append("date", formData.date);
        submitData.append("time", formData.time);
        submitData.append("location", formData.location);
        submitData.append("type", seminarType);
        submitData.append("category", category);
        submitData.append("isFeatured", isFeatured);
        submitData.append("driveLink", formData.driveLink);

        // const result = await AddPresentation(submitData);

        const response = await fetch(`${BASE_URL}/presentation/add`, {
            method: 'POST',
            credentials: "include",
            body: submitData
        });
        const data = await response.json();
        if (response.ok) {
            toast.success('Seminar created successfully');
            return { success: true, seminar: data.seminar };
        } else {
            toast.error(data.message || 'Failed to create seminar');
            return { success: false };
        }
        
        // if (result?.success) {
        //     setFormData({
        //         title: '',
        //         description: '',
        //         bannerImage: null,
        //         speakerName: '',
        //         speakerDesignation: '',
        //         speakerOrganization: '',
        //         date: '',
        //         time: '',
        //         location: '',
        //         driveLink: '',
        //         registrationLink: ''
        //     });
        //     setSeminarType('seminar');
        //     setCategory('technical');
        //     setStatus('upcoming');
        //     setIsFeatured(false);
        //     setTimeout(() => {
        //         navigate('/dashboard');
        //     }, 500);
        // }
    };

    if (userLoading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-black"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-2xl shadow-xl p-8">
                    <h2 className="text-3xl font-bold text-center mb-8 text-[#045C99]">
                        Add New Seminar/Webinar
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Basic Information */}
                        <div className="space-y-4">
                            <h3 className="text-xl font-semibold text-gray-700 border-b pb-2">Basic Information</h3>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Title <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#045C99] focus:border-transparent"
                                    placeholder="Enter seminar/webinar title"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Description <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    rows="5"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#045C99] focus:border-transparent"
                                    placeholder="Enter detailed description"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        
                            
                            <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Type <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        value={seminarType}
                                        onChange={(e) => setSeminarType(e.target.value)}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#045C99] focus:border-transparent"
                                    >
                                        {seminarTypes.map((type) => (
                                            <option key={type} value={type}>
                                                {type.charAt(0).toUpperCase() + type.slice(1)}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Category <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        value={category}
                                        onChange={(e) => setCategory(e.target.value)}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#045C99] focus:border-transparent"
                                    >
                                        {categories.map((cat) => (
                                            <option key={cat} value={cat}>
                                                {cat.charAt(0).toUpperCase() + cat.slice(1)}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Thumbnail <span className="text-red-500">*</span>
                                </label>
                                <div className="flex items-center space-x-4">
                                    <label className="flex items-center px-4 py-2 bg-[#045C99] text-white rounded-lg cursor-pointer hover:bg-[#034a7a]">
                                        <FaImage className="mr-2" />
                                        Choose image
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleBannerChange}
                                            className="hidden"
                                        />
                                    </label>
                                    {bannerPreview && (
                                        <img src={bannerPreview} alt="Banner Preview" className="h-20 w-32 object-cover rounded-lg" />
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Speaker Information */}
                        <div className="space-y-4">
                            <h3 className="text-xl font-semibold text-gray-700 border-b pb-2">Speaker Information</h3>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Speaker Name <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <FaUser className="absolute left-3 top-3 text-gray-400" />
                                        <input
                                            type="text"
                                            name="speakerName"
                                            value={formData.speakerName}
                                            onChange={handleChange}
                                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#045C99] focus:border-transparent"
                                            placeholder="Speaker's full name"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Designation <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="speakerDesignation"
                                        value={formData.speakerDesignation}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#045C99] focus:border-transparent"
                                        placeholder="Job title or position"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Organization
                                </label>
                                <div className="relative">
                                    <FaBuilding className="absolute left-3 top-3 text-gray-400" />
                                    <input
                                        type="text"
                                        name="speakerOrganization"
                                        value={formData.speakerOrganization}
                                        onChange={handleChange}
                                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#045C99] focus:border-transparent"
                                        placeholder="Company or institution name"
                                    />
                                </div>
                            </div>

                            {/* <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Speaker Photo
                                </label>
                                <div className="flex items-center space-x-4">
                                    <label className="flex items-center px-4 py-2 bg-gray-700 text-white rounded-lg cursor-pointer hover:bg-gray-600">
                                        <FaImage className="mr-2" />
                                        Choose Photo
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleSpeakerPhotoChange}
                                            className="hidden"
                                        />
                                    </label>
                                    {speakerPhotoPreview && (
                                        <img src={speakerPhotoPreview} alt="Speaker Preview" className="h-20 w-20 object-cover rounded-full" />
                                    )}
                                </div>
                            </div> */}
                        </div>

                        {/* Event Details */}
                        <div className="space-y-4">
                            <h3 className="text-xl font-semibold text-gray-700 border-b pb-2">Event Details</h3>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Date <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <FaCalendarAlt className="absolute left-3 top-3 text-gray-400" />
                                        <input
                                            type="date"
                                            name="date"
                                            value={formData.date}
                                            onChange={handleChange}
                                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#045C99] focus:border-transparent"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Time <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <FaClock className="absolute left-3 top-3 text-gray-400" />
                                        <input
                                            type="time"
                                            name="time"
                                            value={formData.time}
                                            onChange={handleChange}
                                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#045C99] focus:border-transparent"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Location <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <FaMapMarkerAlt className="absolute left-3 top-3 text-gray-400" />
                                    <input
                                        type="text"
                                        name="location"
                                        value={formData.location}
                                        onChange={handleChange}
                                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#045C99] focus:border-transparent"
                                        placeholder="Venue or online meeting link"
                                    />
                                </div>
                            </div>

                            {/* <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Status <span className="text-red-500">*</span>
                                </label>
                                <select
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#045C99] focus:border-transparent"
                                >
                                    {statuses.map((s) => (
                                        <option key={s} value={s}>
                                            {s.charAt(0).toUpperCase() + s.slice(1)}
                                        </option>
                                    ))}
                                </select>
                            </div> */}
                        </div>

                        {/* Links */}
                        <div className="space-y-4">
                            <h3 className="text-xl font-semibold text-gray-700 border-b pb-2">Links & Resources</h3>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Google Drive Link (Presentation Materials)
                                </label>
                                <div className="relative">
                                    <FaLink className="absolute left-3 top-3 text-gray-400" />
                                    <input
                                        type="url"
                                        name="driveLink"
                                        value={formData.driveLink}
                                        onChange={handleChange}
                                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#045C99] focus:border-transparent"
                                        placeholder="https://drive.google.com/..."
                                    />
                                </div>
                            </div>

                            {/* <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Registration Link
                                </label>
                                <div className="relative">
                                    <FaLink className="absolute left-3 top-3 text-gray-400" />
                                    <input
                                        type="url"
                                        name="registrationLink"
                                        value={formData.registrationLink}
                                        onChange={handleChange}
                                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#045C99] focus:border-transparent"
                                        placeholder="https://forms.google.com/..."
                                    />
                                </div>
                            </div> */}
                        </div>

                        {/* Featured Toggle */}
                        <div className="flex items-center space-x-3">
                            <input
                                type="checkbox"
                                id="featured"
                                checked={isFeatured}
                                onChange={(e) => setIsFeatured(e.target.checked)}
                                className="w-4 h-4 text-[#045C99] border-gray-300 rounded focus:ring-[#045C99]"
                            />
                            <label htmlFor="featured" className="text-sm font-medium text-gray-700">
                                Mark as Featured
                            </label>
                        </div>

                        {/* Submit Button */}
                        <div className="flex justify-end space-x-4 pt-6">
                            <button
                                type="button"
                                onClick={() => navigate('/dashboard')}
                                className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-all"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={loading}
                                className="px-6 py-3 bg-[#045C99] text-white rounded-lg hover:bg-[#034a7a] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? 'Adding...' : 'Add Seminar'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddSeminar;
