import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { FaImage, FaUpload, FaTrash } from 'react-icons/fa';
import { BASE_URL } from '../../constants';
import { useUser } from '../../hooks/useUser';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AddGallery = () => {


    const { getUser,user,loading } = useUser();
    const navigate = useNavigate()


    const [imagePreviews, setImagePreviews] = useState([]);
    const [caption, setCaption] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [imageFiles, setImageFiles] = useState([])


    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        
        // Validate number of images
        if (files.length > 20) {
            toast.error("You can only upload up to 20 images at once");
            return;
        }

        if (imageFiles.length + files.length > 20) {
            toast.error(`You can only upload ${20 - imageFiles.length} more image(s)`);
            return;
        }

        // Validate file sizes
        const invalidFiles = files.filter(file => file.size > 5 * 1024 * 1024);
        if (invalidFiles.length > 0) {
            toast.error("Some images exceed 5MB. Please choose smaller files.");
            return;
        }

        // Create previews
        const newPreviews = [];
        const newFiles = [];

        files.forEach(file => {
            newFiles.push(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                newPreviews.push({
                    file: file,
                    preview: reader.result,
                    name: file.name
                });
                
                if (newPreviews.length === files.length) {
                    setImagePreviews(prev => [...prev, ...newPreviews]);
                    setImageFiles(prev => [...prev, ...newFiles]);
                }
            };
            reader.readAsDataURL(file);
        });
    };

    const removeImage = (index) => {
        setImagePreviews(prev => prev.filter((_, i) => i !== index));
        setImageFiles(prev => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = async(e) => {
        e.preventDefault()

        if(imageFiles.length === 0){
            toast.error("Please select at least one image")
            return
        }

        if(!caption){
            toast.error("Please provide a caption")
            return
        }

        setIsSubmitting(true);

        const formData = new FormData()
        formData.append('caption', caption)
        
        // Append all images
        imageFiles.forEach((file) => {
            formData.append('images', file)
        })

        try {
            const response = await fetch(`${BASE_URL}/gallery/add-gallery-bulk`, {
                method: 'POST',
                body: formData,
                credentials: 'include',
            })
            
            const data = await response.json();
            
            if (!response.ok) {
                toast.error(data.message || "Failed to add gallery");
                setIsSubmitting(false);
                return
            }
            
            toast.success(`${imageFiles.length} image(s) added successfully!`);
            e.target.reset();
            setImagePreviews([]);
            setImageFiles([]);
            setCaption('');
            
            setTimeout(() => {
                navigate('/dashboard')
            }, 500);
        } catch (error) {
            toast.error("Failed to add gallery");
            setIsSubmitting(false);
        }

    }

    useEffect(()=>{
        getUser()
    },[])

    if(loading){
        return <div className="flex items-center justify-center h-screen">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
        </div>
    }

    return (
        user?.role === 'admin' ? <div className="bg-gray-50 min-h-screen py-12">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl md:text-4xl font-bold text-center text-[#045C99] mb-2">Add to Gallery</h1>
                <p className="text-center text-gray-600 mb-10">Upload an image with a caption for the IEEE CS LU SB Chapter gallery</p>

                <div className="bg-white rounded-xl shadow-md overflow-hidden">
                    <form onSubmit={handleSubmit} className="p-8">
                        {/* Image Upload */}
                        <div className="mb-8">
                            <label htmlFor="images" className="block text-gray-700 font-medium mb-2">
                                <div className="flex items-center gap-2 justify-between">
                                    <span className="flex items-center gap-2">
                                        <FaImage /> Select Images* (1-20 images)
                                    </span>
                                    <span className="text-sm text-gray-500">
                                        {imageFiles.length}/20 selected
                                    </span>
                                </div>
                            </label>

                            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center mb-4">
                                <input
                                    type="file"
                                    id="images"
                                    accept="image/*"
                                    multiple
                                    onChange={handleImageChange}
                                    className="hidden"
                                />
                                <label htmlFor="images" className="cursor-pointer">
                                    <FaUpload className="mx-auto h-12 w-12 text-gray-400" />
                                    <p className="mt-2 text-sm text-gray-600">Click to upload images</p>
                                    <p className="text-xs text-gray-500">(JPG, PNG, WEBP up to 5MB each, max 20 images)</p>
                                </label>
                            </div>

                            {/* Image Previews Grid */}
                            {imagePreviews.length > 0 && (
                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
                                    {imagePreviews.map((img, index) => (
                                        <div key={index} className="relative group">
                                            <img
                                                src={img.preview}
                                                alt={`Preview ${index + 1}`}
                                                className="w-full h-32 object-cover border rounded-md"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => removeImage(index)}
                                                className="absolute top-1 right-1 bg-red-500 text-white p-1.5 rounded-full hover:bg-red-600 transition opacity-0 group-hover:opacity-100"
                                                title="Remove image"
                                            >
                                                <FaTrash size={12} />
                                            </button>
                                            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-1 truncate">
                                                {img.name}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Caption */}
                        <div className="mb-6">
                            <label htmlFor="caption" className="block text-gray-700 font-medium mb-2">Caption*</label>
                            <input
                                type="text"
                                id="caption"
                                value={caption}
                                onChange={(e) => setCaption(e.target.value)}
                                placeholder="Enter a caption for these images"
                                className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                            <p className="text-sm text-gray-500 mt-1">This caption will be applied to all uploaded images</p>
                        </div>

                        {/* Submit Button */}
                        <div className="mt-8">
                            <button
                                type="submit"
                                disabled={isSubmitting || imageFiles.length === 0}
                                className={`w-full py-3 px-4 rounded-md font-medium text-white ${isSubmitting || imageFiles.length === 0
                                        ? 'bg-gray-400 cursor-not-allowed'
                                        : 'bg-[#045C99] hover:bg-blue-700 transition'
                                    }`}
                            >
                                {isSubmitting ? `Uploading ${imageFiles.length} image(s)...` : `Add ${imageFiles.length} Image(s) to Gallery`}
                            </button>
                        </div>
                    </form>
                </div>

                {/* Guidelines */}
                <div className="mt-8 bg-blue-50 p-6 rounded-lg border border-blue-100">
                    <h3 className="text-lg font-semibold text-[#045C99] mb-2">Image Guidelines</h3>
                    <ul className="list-disc pl-5 space-y-1 text-gray-700">
                        <li>Upload 1 to 20 high-quality images at once</li>
                        <li>Each image must be under 5MB in size</li>
                        <li>Upload relevant images related to IEEE events and activities</li>
                        <li>Ensure images are clear and well-composed</li>
                        <li>The caption will be applied to all uploaded images</li>
                        <li>Make sure you have permission to use and publish the images</li>
                        <li>Avoid uploading copyrighted materials without proper authorization</li>
                    </ul>
                </div>
            </div>
        </div> : <div className="min-h-screen"></div>
    );
};

export default AddGallery;