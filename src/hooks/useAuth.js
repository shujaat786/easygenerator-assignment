import { useState } from 'react';
import axiosInstance from '../api/axios';

export const useAuth = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const signUp = async (email, name, password) => {
        try {
            setLoading(true);
            setError(null);

            const response = await axiosInstance.post('/sign-up', { email, name, password });
            setLoading(false);
            return response.data; // Return success message
        } catch (err) {
            setLoading(false);
            setError(err.response?.data?.message || 'Something went wrong');
        }
    };

    const signIn = async (email, password) => {
        try {
            setLoading(true);
            setError(null);

            const response = await axiosInstance.post('/sign-in', { email, password });
            setLoading(false);
            return response.data; // Return token
        } catch (err) {
            setLoading(false);
            setError(err.response?.data?.message || 'Invalid credentials');
        }
    };

    return { signUp, signIn, loading, error };
};
