'use client';
import React, { useEffect, useState } from 'react';
type ToastProps = {
    toastType: 'success' | 'danger' | 'warning';
    message: string;
};

const Toast: React.FC<ToastProps> = ({ toastType, message }) => {
    const [open, setOpen] = useState(false);
    useEffect(() => {
        if (message && toastType) setOpen(true);
        else setOpen(false);
    }, [message, toastType]);

    const toastClasses = {
        success:
            'text-green-500 bg-green-100 dark:text-green-200 dark:bg-green-800',
        danger: 'text-red-500 bg-red-100 dark:text-red-200 dark:bg-red-800',
        warning:
            'text-orange-500 bg-orange-100 dark:text-orange-200 dark:bg-orange-700',
    };

    const toastDismissTargets = {
        success: '#toast-success',
        danger: '#toast-danger',
        warning: '#toast-warning',
    };

    if (open) {
        return (
            <div
                id={`toast-${toastType}`}
                className={`flex items-center w-full max-w-xs p-4 mt-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800 ${toastClasses[toastType]}`}
                role="alert"
            >
                <div className="ml-3 text-sm font-normal">{message}</div>
                <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className={`ml-auto -mx-1.5 -my-1.5 outline-none text-gray-400  rounded-lg p-1.5 0 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 `}
                    data-dismiss-target={toastDismissTargets[toastType]}
                    aria-label="Close"
                >
                    <span className="sr-only">Close</span>
                    <svg
                        className="w-3 h-3"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 14 14"
                    >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                        />
                    </svg>
                </button>
            </div>
        );
    }
};

export default Toast;
