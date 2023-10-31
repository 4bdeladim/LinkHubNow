"use client";
import React, { useRef, useState } from "react";
import axios from "axios";
import Toast from "./Toast";
import { Button } from "./ui/button";

interface UploadImageProps {
    setProfilePic: React.Dispatch<React.SetStateAction<string>>;
}

function UploadImage({ setProfilePic }: UploadImageProps) {
    const [newSelectedImage, setSelectedImage] = useState<File | null>(null);
    const [toast, setToast] = useState<{
        type: "danger" | "success";
        msg: string;
    } | null>(null);
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const toBase64 = (file: File) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => setProfilePic(reader.result as string);
        reader.onerror = (error) => console.log("Error: ", error);
    };

    const openInputFile = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (inputRef.current) inputRef.current.click();
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const selectedFile = e.target.files[0];
            setSelectedImage(selectedFile);
            toBase64(selectedFile);
        }
    };

    const handleUpload = async (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    ) => {
        e.preventDefault();
        setLoading(true);

        try {
            const formData = new FormData();
            if (newSelectedImage) {
                formData.append("file", newSelectedImage);
                const { data } = await axios.post("/api/upload", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });
                setProfilePic(data.url);
                setToast({
                    type: "success",
                    msg: "Image updated successfully",
                });
                setLoading(false);
                setTimeout(() => setToast(null), 5000);
            }
        } catch (error) {
            setLoading(false);
            setToast({
                type: "danger",
                msg: "Something went wrong with the upload",
            });
            setTimeout(() => setToast(null), 5000);
        }
    };

    return (
        <div className="flex flex-col items-center mt-4">
            <form className="flex flex-col items-center">
                <div className="mb-4">
                    <div className="relative flex justify-center">
                        <input
                            onChange={handleImageChange}
                            className="border-gray-300 focus:ring-blue-600 block w-full overflow-hidden cursor-pointer border text-gray-800 bg-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:border-transparent"
                            id="view_model_avatar"
                            name="image"
                            type="file"
                            ref={inputRef}
                            style={{ display: "none" }}
                        />
                        <Button onClick={openInputFile} className="flex items-center gap-4">
                            <svg
                                viewBox="64 64 896 896"
                                focusable="false"
                                data-icon="upload"
                                width="1em"
                                height="1em"
                                fill="white"
                                aria-hidden="true"
                            >
                                <path d="M400 317.7h73.9V656c0 4.4 3.6 8 8 8h60c4.4 0 8-3.6 8-8V317.7H624c6.7 0 10.4-7.7 6.3-12.9L518.3 163a8 8 0 00-12.6 0l-112 141.7c-4.1 5.3-.4 13 6.3 13zM878 626h-60c-4.4 0-8 3.6-8 8v154H214V634c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8v198c0 17.7 14.3 32 32 32h684c17.7 0 32-14.3 32-32V634c0-4.4-3.6-8-8-8z"></path>
                            </svg>
                            Upload Avatar
                        </Button>
                    </div>
                </div>
                {
                    newSelectedImage ? (
                        <Button type="submit" onClick={handleUpload}>
                    {loading ? (
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
                    ) : (
                        "Save"
                    )}
                </Button>
                    ) : null
                }
                
                {toast ? (
                    <Toast toastType={toast.type} message={toast.msg} />
                ) : null}
            </form>
        </div>
    );
}

export default UploadImage;
