import React from 'react';

const Toast = ({ message, type, onClose }) => {
    const toastStyle = {
        success: 'bg-green-500 text-white',
        error: 'bg-red-500 text-white',
    };

    if (!message) return null;

    return (
        <div
            className={`fixed top-4 right-4 z-50 w-96 p-4 rounded-lg shadow-lg ${toastStyle[type]}`}
        >
            <div className="flex items-center justify-between">
                <span>{message}</span>
                <button
                    onClick={onClose}
                    className="text-white font-bold ml-4"
                >
                    ×
                </button>
            </div>
        </div>
    );
};

export default Toast;
