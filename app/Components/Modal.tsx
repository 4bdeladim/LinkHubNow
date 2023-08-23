"use client";
import React, { useState } from "react";

type TProps = {
    save: (title:string, url:string, icon:string) => void;
}
const Modal:React.FC<TProps> = ({save}) => {
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
        closeModal();
    }

    return (
        <div>
            <button
                onClick={openModal}
                type="button"
                className="w-[320px] flex justify-center gap-4 text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center items-center mr-2 my-4 dark:bg-white dark:text-black"
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
                <span className="text-white dark:text-black">Add Link</span>
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
                            >
                                <option selected>Link Icon</option>
                                <option value="facebook">Facebook</option>
                                <option value="twitter">Twitter</option>
                                <option value="instagram">Instagram</option>
                                <option value="linkedin">LinkedIn</option>
                                <option value="youtube">YouTube</option>
                                <option value="pinterest">Pinterest</option>
                                <option value="tiktok">TikTok</option>
                                <option value="snapchat">Snapchat</option>
                            </select>
                            <button onClick={saveLink} className="mt-3 bg-black rounded-lg text-white px-10 py-2 font-bold">
                                Add
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Modal;
