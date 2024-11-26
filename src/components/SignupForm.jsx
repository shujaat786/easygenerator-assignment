import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';

const SignUpForm = () => {
    const { signUp, loading, error } = useAuth();
    const [formData, setFormData] = useState({ email: '', name: '', password: '' });
    const [successMessage, setSuccessMessage] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { email, name, password } = formData;

        const result = await signUp(email, name, password);
        if (result) {
            setSuccessMessage(result.message); // Show success message
            setFormData({ email: '', name: '', password: '' }); // Clear form
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="w-full max-w-screen-md mx-auto mt-10 bg-white p-12 rounded-lg shadow-xl space-y-6"
        >
            <h2 className="text-4xl font-bold text-center">Sign Up</h2>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            {successMessage && <p className="text-green-500 text-sm">{successMessage}</p>}

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
                <label className="block mb-2 text-lg font-medium">Name</label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
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
                {loading ? 'Signing Up...' : 'Sign Up'}
            </button>
        </form>
    );
};

export default SignUpForm;
