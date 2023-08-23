'use client';

import { useState } from 'react';
import axios from 'axios';
import Toast from '../Components/Toast';
import { redirect } from 'next/navigation';

interface IMessage {
    message: string;
    type: 'success' | 'danger' | 'warning';
}

export default function SignUp() {
    const [email, setEmail] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmationPassword, setConfirmationPassword] =
        useState<string>('');
    const [message, setMessage] = useState<IMessage>();
    const [loading, setLoading] = useState(false);

    async function registerUser() {
        setLoading(true);
        if (name.length <= 3) {
            setMessage({
                type: 'danger',
                message: 'Name must be more than 3 characters',
            });
            setLoading(false);
            return;
        }

        if (confirmationPassword !== password) {
            setMessage({
                type: 'danger',
                message: 'Password and confirmation password must match',
            });
            setLoading(false);
            return;
        }

        if (password.length <= 8) {
            setMessage({
                type: 'danger',
                message: 'Password must be more than 8 characters',
            });
            setLoading(false);
            return;
        }
        try {
            const { data } = await axios.post(`/api/auth/signup`, {
                email,
                name,
                password,
                confirmationPassword,
            });
            setLoading(false);
            setMessage({ type: 'success', message: data.message });
            redirect("/")
        } catch (error: any) {
            setMessage({ type: 'danger', message: error.response.data.error });
            setLoading(false);
        }
    }

    return (
        <div className="w-full flex justify-center items-center flex-col h-screen">
            <h1 className="text-gray-700 dark:text-white font-semibold text-lg mb-4">
                Create a new account.
            </h1>
            <form className="w-full max-w-lg p-4 rounded-md">
                <div className="flex flex-wrap -mx-3">
                    <div className="w-full px-3">
                        <label
                            className="block uppercase tracking-wide text-gray-700 dark:text-white text-xs font-bold mb-2"
                            htmlFor="grid-name"
                        >
                            Name
                        </label>
                        <input
                            onChange={(e) => setName(e.target.value)}
                            className="appearance-none block w-full bg-gray-200 text-gray-700  border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="grid-name"
                            type="name"
                            placeholder="Jhon"
                        />
                    </div>
                </div>
                <div className="flex flex-wrap -mx-3">
                    <div className="w-full px-3">
                        <label
                            className="block uppercase tracking-wide text-gray-700 dark:text-white text-xs font-bold mb-2"
                            htmlFor="grid-password"
                        >
                            Email
                        </label>
                        <input
                            onChange={(e) => setEmail(e.target.value)}
                            className="appearance-none block w-full bg-gray-200 text-gray-700  border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="grid-email"
                            type="email"
                            placeholder="you@email.com"
                        />
                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-3">
                    <div className="w-full px-3">
                        <label
                            className="block uppercase tracking-wide text-gray-700 dark:text-white text-xs font-bold mb-2"
                            htmlFor="grid-password"
                        >
                            Password
                        </label>
                        <input
                            onChange={(e) => setPassword(e.target.value)}
                            className="appearance-none block w-full bg-gray-200  text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="grid-password"
                            type="password"
                            placeholder="******************"
                        />
                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-3">
                    <div className="w-full px-3">
                        <label
                            className="block uppercase tracking-wide dark:text-white text-gray-700 text-xs font-bold mb-2"
                            htmlFor="grid-password"
                        >
                            Confirm Password
                        </label>
                        <input
                            onChange={(e) =>
                                setConfirmationPassword(e.target.value)
                            }
                            className="appearance-none block w-full bg-gray-200  text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="grid-confirmation-password"
                            type="password"
                            placeholder="******************"
                        />
                        <p className="text-gray-600 text-xs italic dark:text-white">
                            Make it as long and as crazy as you&lsquo;d like
                        </p>
                    </div>
                </div>
                <button
                    onClick={registerUser}
                    className="px-5 bg-primary flex justify-center items-center max-h-[36px] bg-blue-500 text-sm text-white py-2 rounded"
                    type="button"
                >
                    {loading ? (
                        <div role="status">
                            <svg
                                aria-hidden="true"
                                className="inline w-4 h-4 text-gray-200  animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300"
                                viewBox="0 0 100 101"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                    fill="currentColor"
                                />
                                <path
                                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                    fill="currentFill"
                                />
                            </svg>
                        </div>
                    ) : (
                        'Sign Up'
                    )}
                </button>
            </form>
            <Toast toastType={message?.type!} message={message?.message!} />
        </div>
    );
}
