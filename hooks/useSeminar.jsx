import { useState } from 'react';
import { BASE_URL } from '../constants';
import { toast } from 'react-toastify';

export const useSeminar = () => {
    const [seminars, setSeminars] = useState([]);
    const [featuredSeminar, setFeaturedSeminar] = useState(null);
    const [upcomingSeminars, setUpcomingSeminars] = useState([]);
    const [singleSeminar, setSingleSeminar] = useState(null);
    const [loading, setLoading] = useState(false);

    // Get all seminars
    const getSeminars = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${BASE_URL}/seminar`, {
                method: 'GET'
            });
            const data = await response.json();
            if (response.ok) {
                setSeminars(data.seminars || []);
            }
        } catch (error) {
            console.error('Error fetching seminars:', error);
            toast.error('Failed to load seminars');
        } finally {
            setLoading(false);
        }
    };

    // Get featured seminar
    const getFeaturedSeminar = async () => {
        try {
            const response = await fetch(`${BASE_URL}/seminar/featured`, {
                method: 'GET'
            });
            const data = await response.json();
            if (response.ok) {
                setFeaturedSeminar(data.seminar);
            }
        } catch (error) {
            console.error('Error fetching featured seminar:', error);
        }
    };

    // Get upcoming seminars
    const getUpcomingSeminars = async () => {
        try {
            const response = await fetch(`${BASE_URL}/seminar/upcoming`, {
                method: 'GET'
            });
            const data = await response.json();
            if (response.ok) {
                setUpcomingSeminars(data.seminars || []);
            }
        } catch (error) {
            console.error('Error fetching upcoming seminars:', error);
        }
    };

    // Get seminar by ID
    const getSeminarById = async (id) => {
        setLoading(true);
        try {
            const response = await fetch(`${BASE_URL}/seminar/${id}`, {
                method: 'GET'
            });
            const data = await response.json();
            if (response.ok) {
                setSingleSeminar(data.seminar);
            }
        } catch (error) {
            console.error('Error fetching seminar:', error);
            toast.error('Failed to load seminar details');
        } finally {
            setLoading(false);
        }
    };

    // Get seminars by type
    const getSeminarsByType = async (type) => {
        setLoading(true);
        try {
            const response = await fetch(`${BASE_URL}/seminar/type/${type}`, {
                method: 'GET'
            });
            const data = await response.json();
            if (response.ok) {
                setSeminars(data.seminars || []);
            }
        } catch (error) {
            console.error('Error fetching seminars by type:', error);
            toast.error('Failed to filter seminars');
        } finally {
            setLoading(false);
        }
    };

    // Get seminars by category
    const getSeminarsByCategory = async (category) => {
        setLoading(true);
        try {
            const response = await fetch(`${BASE_URL}/seminar/category/${category}`, {
                method: 'GET'
            });
            const data = await response.json();
            if (response.ok) {
                setSeminars(data.seminars || []);
            }
        } catch (error) {
            console.error('Error fetching seminars by category:', error);
            toast.error('Failed to filter seminars');
        } finally {
            setLoading(false);
        }
    };

    // Filter seminars by date
    const filterSeminarsByDate = async (startDate) => {
        setLoading(true);
        try {
            const response = await fetch(`${BASE_URL}/seminar/date-filter`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ startDate })
            });
            const data = await response.json();
            if (response.ok) {
                setSeminars(data.seminars || []);
            }
        } catch (error) {
            console.error('Error filtering seminars by date:', error);
            toast.error('Failed to filter seminars');
        } finally {
            setLoading(false);
        }
    };

    // Create seminar (Admin)
    const createSeminar = async (formData) => {
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${BASE_URL}/seminar/create`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData
            });
            const data = await response.json();
            if (response.ok) {
                toast.success('Seminar created successfully');
                return { success: true, seminar: data.seminar };
            } else {
                toast.error(data.message || 'Failed to create seminar');
                return { success: false };
            }
        } catch (error) {
            console.error('Error creating seminar:', error);
            toast.error('Failed to create seminar');
            return { success: false };
        } finally {
            setLoading(false);
        }
    };

    // Update seminar (Admin)
    const updateSeminar = async (id, formData) => {
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${BASE_URL}/seminar/update/${id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData
            });
            const data = await response.json();
            if (response.ok) {
                toast.success('Seminar updated successfully');
                return { success: true, seminar: data.seminar };
            } else {
                toast.error(data.message || 'Failed to update seminar');
                return { success: false };
            }
        } catch (error) {
            console.error('Error updating seminar:', error);
            toast.error('Failed to update seminar');
            return { success: false };
        } finally {
            setLoading(false);
        }
    };

    // Delete seminar (Admin)
    const deleteSeminar = async (id) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${BASE_URL}/seminar/delete/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = await response.json();
            if (response.ok) {
                toast.success('Seminar deleted successfully');
                getSeminars(); // Refresh list
                return { success: true };
            } else {
                toast.error(data.message || 'Failed to delete seminar');
                return { success: false };
            }
        } catch (error) {
            console.error('Error deleting seminar:', error);
            toast.error('Failed to delete seminar');
            return { success: false };
        }
    };

    return {
        seminars,
        featuredSeminar,
        upcomingSeminars,
        singleSeminar,
        loading,
        setSeminars,
        getSeminars,
        getFeaturedSeminar,
        getUpcomingSeminars,
        getSeminarById,
        getSeminarsByType,
        getSeminarsByCategory,
        filterSeminarsByDate,
        createSeminar,
        updateSeminar,
        deleteSeminar
    };
};
