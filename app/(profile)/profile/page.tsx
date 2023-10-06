"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";

export default function Bio() {
    const [newBio, setBio] = useState<string>("");
    const [newUsername, setUsername] = useState<string>("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<{type: "error" | "success", msg: string} | null>(null);
    const session = useSession();
    const user = session?.data?.user;
    const { data, isLoading } = useQuery(['profileInfo'], getProfileInfo);
    async function getProfileInfo() {
        const { data } = await axios.get("/api/profile");
        return data;
    }

    useEffect(() => {
        getProfileInfo()
    }, [])


    const changeBio = async () => {
        try {
            setLoading(true);
            await axios.post("/api/profile", {
                bio: newBio,
                username: newUsername,
            });
            setLoading(false);
            setError({type: "success", msg: "Data updated successfully"})
        } catch (error:any){
            setError({type: "error", msg: error.response.data.error})
            setLoading(false);
            return null;
        }
    };

    return (
        <div className="w-full flex flex-col h-[calc(100vh - 80px)] flex justify-center items-center">
            {
                user?.image ? (
                    <Image
                        width="180"
                        height="180"
                        src={user?.image as string}
                        alt="Avatar"
                        className="border rounded-full"
                    />
                ) : null
            }
            <h1 className="text-white my-4">
                { data?.bio  }
            </h1>
            <div className="w-[500px]">
                <label htmlFor="username" className="text-white my-2">
                    Username:
                </label>
                <input type="text" defaultValue={data?.username} onChange={(e) => setUsername(e.target.value)} className="outline-none block p-2.5 w-full text-sm  rounded-lg border border-gray-300 bg-black dark:border-gray-600 dark:placeholder-gray-40 text-white my-2" />
                <label
                    htmlFor="bio"
                    className="block mb-2 text-sm font-medium text-white"
                >
                    Your Bio
                </label>
                <textarea
                    id="bio"
                    rows={4}
                    defaultValue={data?.bio}
                    onChange={(e) => setBio(e.target.value)}
                    className="outline-none block p-2.5 w-full text-sm  rounded-lg border border-gray-300 bg-black dark:border-gray-600 dark:placeholder-gray-40 text-white"
                    placeholder="Write your bio here..."
                ></textarea>
                {loading ? (
                    <button
                        onClick={changeBio}
                        className="w-[200px] flex justify-center gap-4  font-medium rounded-lg text-sm px-5 py-2.5 text-center items-center mr-2 my-8 bg-white text-black"
                    >
                        <svg
                            aria-hidden="true"
                            role="status"
                            className="inline w-4 h-4 text-black animate-spin"
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
                ) : (
                    <button
                        onClick={changeBio}
                        className="w-[200px] flex justify-center gap-4 font-medium rounded-lg text-sm px-5 py-2.5 text-center items-center mr-2 my-8 bg-white text-black"
                    >
                        Save
                    </button>
                )}
            </div>
            {
                error ? (
                    error.type === "success" ? (
                        <div id="toast-success" className="flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800" role="alert">
                            <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200">
                                <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                                </svg>
                                <span className="sr-only">Check icon</span>
                            </div>
                            <div className="ml-3 text-sm font-normal">{error.msg}</div>
                        </div>
                    ) : (
                        <div id="toast-danger" className="flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800" role="alert">
                            <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-red-500 bg-red-100 rounded-lg dark:bg-red-800 dark:text-red-200">
                                <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z"/>
                                </svg>
                                <span className="sr-only">Error icon</span>
                            </div>
                            <div className="ml-3 text-sm font-normal">{error.msg}</div>

                        </div>
                    )
                ) : null
            }
        </div>
    );
}
