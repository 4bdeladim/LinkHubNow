"use client";
import React, { useState } from "react";

type TProps = {
    // eslint-disable-next-line no-unused-vars
    save: (title: string, url: string, icon: string) => void;
    loading: boolean;
};
const Modal: React.FC<TProps> = ({ save, loading }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [title, setTitle] = useState<string>("");
    const [URL, setURL] = useState<string>("");
    const [icon, setIcon] = useState<string>("");

    const openModal = () => {
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    const saveLink = () => {
        save(title, URL, icon);
    };

    return (
        <div>
            <button
                onClick={openModal}
                type="button"
                className="w-[320px] flex justify-center gap-4  font-medium rounded-lg text-sm px-5 py-2.5 text-center items-center mr-2 my-8 bg-white text-black"
            >
                <svg
                    width="16"
                    height="16"
                    viewBox="0 0 8 8"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M4 1.5L4 6.5"
                        stroke="#303030"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                    />
                    <path
                        d="M6.5 4L1.5 4"
                        stroke="#303030"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                    />
                </svg>
                <span className="text-black">Add Link</span>
            </button>

            {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center">
                    <div className="fixed inset-0 bg-gray-900 opacity-50"></div>
                    <div className="z-10 w-full max-w-md p-4 mx-auto bg-white rounded-lg shadow-md">
                        <div className="flex items-start justify-between mb-4">
                            <h2 className="text-lg font-semibold">
                                Add new Link
                            </h2>
                            <button
                                onClick={closeModal}
                                className="text-gray-500 hover:text-gray-700 focus:outline-none"
                            >
                                Close
                            </button>
                        </div>
                        <form>
                            <div className="flex flex-wrap -mx-3">
                                <div className="w-full px-3">
                                    <label
                                        className="block uppercase tracking-wide text-black text-xs font-bold mb-2"
                                        htmlFor="grid-name"
                                    >
                                        Link Title:
                                    </label>
                                    <input
                                        onChange={(e) =>
                                            setTitle(e.target.value)
                                        }
                                        className="appearance-none block w-full bg-gray-200 text-black  border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                        id="grid-title"
                                        type="text"
                                        placeholder="Twitter"
                                    />
                                </div>
                            </div>
                            <div className="flex flex-wrap -mx-3">
                                <div className="w-full px-3">
                                    <label
                                        className="block uppercase tracking-wide text-black text-xs font-bold mb-2"
                                        htmlFor="grid-url"
                                    >
                                        Link URL:
                                    </label>
                                    <input
                                        onChange={(e) => setURL(e.target.value)}
                                        className="appearance-none block w-full bg-gray-200 text-black  border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                        id="grid-url"
                                        type="url"
                                        placeholder="https://twitter.com/"
                                    />
                                </div>
                            </div>

                            <label
                                className="block uppercase tracking-wide text-black text-xs font-bold mb-2"
                                htmlFor="grid-name"
                            >
                                Select an option
                            </label>
                            <select
                                id="countries"
                                className="bg-white border border-gray-300 text-black text-sm rounded-lg  block w-full p-2.5 outline-none cursor-pointer"
                                onChange={(e) => setIcon(e.target.value)}
                                defaultValue="Link Icon"
                            >
                                <option value="Link Icon">Link Icon</option>
                                <option value="facebook">Facebook</option>
                                <option value="twitter">Twitter</option>
                                <option value="instagram">Instagram</option>
                                <option value="linkedin">LinkedIn</option>
                                <option value="youtube">YouTube</option>
                                <option value="pinterest">Pinterest</option>
                                <option value="tiktok">TikTok</option>
                                <option value="snapchat">Snapchat</option>
                            </select>
                            {!loading ? (
                                <button
                                    onClick={saveLink}
                                    className="mt-3 bg-black rounded-lg text-white px-10 py-2 font-bold"
                                    
                                >
                                    Add
                                </button>
                            ) : (
                                <button
                                    disabled
                                    className="mt-3 bg-black rounded-lg text-white px-10 py-2 font-bold"
                                >
                                    <svg
                                        aria-hidden="true"
                                        role="status"
                                        className="inline w-4 h-4 text-white animate-spin"
                                        viewBox="0 0 100 101"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                            fill="#E5E7EB"
                                        />
                                        <path
                                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                            fill="currentColor"
                                        />
                                    </svg>
                                </button>
                            )}
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Modal;
