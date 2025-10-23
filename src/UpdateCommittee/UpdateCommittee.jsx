import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { FaIdCard, FaFacebook, FaLinkedin } from 'react-icons/fa';
import { BASE_URL } from '../../constants';
import { toast, ToastContainer } from 'react-toastify';
import { useUser } from '../../hooks/useUser';

const UpdateCommittee = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const committeeId = searchParams.get('id');
    const { user, getUser } = useUser();

    const [committeeformData, setCommitteeFormData] = useState({
        name: '',
        designation: '',
        image: null,
        id: '',
        type: '',
        facebookLink: '',
        linkedinLink: ''
    });

    const [currentImage, setCurrentImage] = useState('');
    const [loading, setLoading] = useState(true);

    const memberType = [
        'Chairperson',
        'Vice Chairperson',
        'Secretary',
        'Treasurer',
        'ACM Coordinator',
        'Webmaster',
        'Program Coordinator',
        'Publicity Coordinator',
        'Photography and Video Content Executive',
        'Publications & Newsletter Coordinator',
        'Membership Development Coordinator',
        'Logistic Executive',
        'Graphics Design Executive',
        'Chief Reporting Executive',
        'Volunteer'
    ];

    useEffect(() => {
        getUser();
        if (committeeId) {
            fetchCommitteeData();
        }
    }, [committeeId]);

    const fetchCommitteeData = async () => {
        try {
            // Fetch all excom members
            const response = await fetch(`${BASE_URL}/committee/excom`);
            const data = await response.json();
            
            if (data.success && data.excom) {
                // Find the specific member by ID
                const member = data.excom.find(m => m._id === committeeId);
                
                if (member) {
                    setCommitteeFormData({
                        name: member.name || '',
                        designation: member.designation || '',
                        image: null,
                        id: member.IEEEID || '',
                        type: member.type || '',
                        facebookLink: member.facebook || '',
                        linkedinLink: member.linkedin || ''
                    });
                    setCurrentImage(member.hosted_image || '');
                } else {
                    toast.error('Committee member not found');
                }
            } else {
                toast.error('Failed to fetch committee member data');
            }
        } catch (error) {
            console.log(error);
            toast.error('Error loading committee member data');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', committeeformData.name);
        formData.append('designation', committeeformData.designation);
        formData.append('facebookLink', committeeformData.facebookLink);
        formData.append('linkedinLink', committeeformData.linkedinLink);
        formData.append('type', committeeformData.type);
        if (committeeformData.image) {
            formData.append('image', committeeformData.image);
        }
        formData.append('id', committeeformData.id);

        try {
            const response = await fetch(`${BASE_URL}/committee/update-committee/${committeeId}`, {
                method: 'PUT',
                credentials: 'include',
                body: formData
            });
            const data = await response.json();
            
            if (!data.success) {
                toast.error(data.message || 'Failed to update');
                return;
            }
            
            toast.success('Updated successfully');
            setTimeout(() => {
                navigate('/members/excom');
            }, 1500);
        } catch (error) {
            console.log(error);
            toast.error('Error updating committee member');
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="animate-spin rounded-full h-40 w-40 border-t-2 border-b-2 border-gray-900"></div>
            </div>
        );
    }

    if (user?.role !== 'admin') {
        return (
            <div className='flex flex-col justify-center items-center min-h-screen'>
                <div>You are not authorized</div>
                <br />
                <button onClick={() => navigate('/')} className='p-2 bg-blue-500 text-white rounded'>
                    Go to home
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 py-8">
            <ToastContainer />
            <div className="max-w-4xl mx-auto px-4">
                <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="mb-6">
                        <h1 className="text-2xl font-semibold text-gray-800">Update Committee Member</h1>
                        <p className="text-gray-600 mt-1">Update IEEE CS LU SB Chapter committee member information</p>
                    </div>

                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Name Input */}
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                                    Full Name*
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={committeeformData.name}
                                    className="block w-full shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm border-gray-300 rounded-md py-2 px-3 border"
                                    placeholder="Enter committee member's full name"
                                    onChange={(e) => setCommitteeFormData({ ...committeeformData, name: e.target.value })}
                                    required
                                />
                            </div>

                            {/* Designation Input */}
                            <div>
                                <label htmlFor="designation" className="block text-sm font-medium text-gray-700 mb-1">
                                    Designation*
                                </label>
                                <select
                                    id="category"
                                    name="category"
                                    value={committeeformData.designation}
                                    onChange={(e) => setCommitteeFormData({ ...committeeformData, designation: e.target.value })}
                                    className="block w-full shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm border-gray-300 rounded-md py-2 px-3 border"
                                    required
                                >
                                    <option value="">Select Member category</option>
                                    {memberType?.map((category, index) => (
                                        <option key={index} value={category}>{category}</option>
                                    ))}
                                </select>
                            </div>

                            {/* IEEE ID Input */}
                            <div>
                                <label htmlFor="ieeeId" className="block text-sm font-medium text-gray-700 mb-1">
                                    IEEE ID*
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FaIdCard className="h-4 w-4 text-gray-400" />
                                    </div>
                                    <input
                                        type="text"
                                        id="ieeeId"
                                        name="ieeeId"
                                        value={committeeformData.id}
                                        onChange={(e) => setCommitteeFormData({ ...committeeformData, id: e.target.value || '' })}
                                        className="pl-10 block w-full shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm border-gray-300 rounded-md py-2 px-3 border"
                                        placeholder="Enter 8-digit IEEE ID"
                                        title="IEEE ID should be an 8-digit number"
                                    />
                                </div>
                            </div>

                            {/* Committee Type Select */}
                            <div>
                                <label htmlFor="committeeType" className="block text-sm font-medium text-gray-700 mb-1">
                                    Committee Type*
                                </label>
                                <select
                                    id="committeeType"
                                    name="committeeType"
                                    value={committeeformData.type}
                                    onChange={(e) => setCommitteeFormData({ ...committeeformData, type: e.target.value })}
                                    className="block w-full shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm border-gray-300 rounded-md py-2 px-3 border"
                                    required
                                >
                                    <option value="">Select committee type</option>
                                    <option value="ExCom">ExCom</option>
                                    <option value="Ex ExCom">Ex ExCom</option>
                                    <option value="Advisory Panel">Advisory Panel</option>
                                    <option value="Volunteer">Volunteer</option>
                                    <option value="Member">Member</option>
                                </select>
                            </div>

                            {/* Facebook Link Input */}
                            <div>
                                <label htmlFor="facebookLink" className="block text-sm font-medium text-gray-700 mb-1">
                                    Facebook Profile
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FaFacebook className="h-4 w-4 text-blue-600" />
                                    </div>
                                    <input
                                        type="url"
                                        id="facebookLink"
                                        onChange={(e) => setCommitteeFormData({ ...committeeformData, facebookLink: e.target.value })}
                                        value={committeeformData.facebookLink}
                                        name="facebookLink"
                                        className="pl-10 block w-full shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm border-gray-300 rounded-md py-2 px-3 border"
                                        placeholder="https://facebook.com/username"
                                    />
                                </div>
                            </div>

                            {/* LinkedIn Link Input */}
                            <div>
                                <label htmlFor="linkedinLink" className="block text-sm font-medium text-gray-700 mb-1">
                                    LinkedIn Profile
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FaLinkedin className="h-4 w-4 text-blue-800" />
                                    </div>
                                    <input
                                        type="url"
                                        id="linkedinLink"
                                        name="linkedinLink"
                                        value={committeeformData.linkedinLink}
                                        onChange={(e) => setCommitteeFormData({ ...committeeformData, linkedinLink: e.target.value })}
                                        className="pl-10 block w-full shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm border-gray-300 rounded-md py-2 px-3 border"
                                        placeholder="https://linkedin.com/in/username"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Current Image Display */}
                        {currentImage && (
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Current Profile Image
                                </label>
                                <img 
                                    src={currentImage} 
                                    alt="Current profile" 
                                    className="w-32 h-32 object-cover rounded-lg border-2 border-gray-200"
                                />
                            </div>
                        )}

                        {/* Image Upload */}
                        <div>
                            <label htmlFor="profileImage" className="block text-sm font-medium text-gray-700 mb-1">
                                Update Profile Image {!currentImage && '*'}
                            </label>
                            <div className="mt-1 flex items-center">
                                <span className="inline-block h-12 w-12 rounded-full overflow-hidden bg-gray-100 mr-4">
                                    <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                                    </svg>
                                </span>
                                <input
                                    type="file"
                                    id="profileImage"
                                    name="profileImage"
                                    onChange={(e) => setCommitteeFormData({ ...committeeformData, image: e.target.files[0] })}
                                    accept="image/*"
                                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                />
                            </div>
                            <p className="mt-1 text-xs text-gray-500">
                                {currentImage ? 'Leave empty to keep current image' : 'Recommended: Square image, at least 300x300 pixels'}
                            </p>
                        </div>

                        {/* Submit Buttons */}
                        <div className="pt-4 flex gap-4">
                            <button
                                type="submit"
                                className="bg-[#045C99] text-white py-2 px-6 rounded-md font-medium hover:bg-blue-700 transition duration-300"
                            >
                                Update Committee Member
                            </button>
                            <button
                                type="button"
                                onClick={() => navigate('/members/excom')}
                                className="bg-gray-500 text-white py-2 px-6 rounded-md font-medium hover:bg-gray-600 transition duration-300"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UpdateCommittee;
