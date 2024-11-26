import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const SignInForm = () => {
    const { signIn, loading, error } = useAuth();
    const [formData, setFormData] = useState({ email: '', password: '' });
    const navigate = useNavigate(); // Hook to navigate

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { email, password } = formData;

        const result = await signIn(email, password);
        if (result && result.token) {
            // Navigate to the application page on success
            navigate('/application');
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="w-full max-w-screen-md mx-auto mt-10 bg-white p-12 rounded-lg shadow-xl space-y-6"
        >
            <h2 className="text-4xl font-bold text-center">Sign In</h2>
            {error && <p className="text-red-500 text-sm">{error}</p>}

            <div>
                <label className="block mb-2 text-lg font-medium">Email</label>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg p-4 text-lg"
                    required
                />
            </div>

            <div>
                <label className="block mb-2 text-lg font-medium">Password</label>
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg p-4 text-lg"
                    required
                />
            </div>

            <button
                type="submit"
                className="w-full bg-blue-500 text-white py-4 text-lg rounded-lg hover:bg-blue-600"
                disabled={loading}
            >
                {loading ? 'Signing In...' : 'Sign In'}
            </button>
        </form>
    );
};

export default SignInForm;
