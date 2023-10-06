"use client"
import { SetStateAction, useState } from "react";
import axios from "axios";
import Toast from "./Toast";
import { useQueryClient } from "@tanstack/react-query";




export default function UploadImage({ setProfilePic }: { setProfilePic: React.Dispatch<SetStateAction<string>>}) {
  const [newSelectedImage, setSelectedImage] = useState<File | null>(null);
  const [toast, setToast] = useState<{type: "danger"|"success", msg: string}|null>(null);
  

  function toBase64(file:File) {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
        setProfilePic(reader.result as string)
    };
    reader.onerror = function (error) {
        console.log('Error: ', error);
    };
  }
  function handleImageChange(e:React.ChangeEvent<HTMLInputElement>){
    if(e.target.files) {
        setSelectedImage(e.target.files[0])
        toBase64(e.target.files[0])
    }
  } 
  async function handleUpload(e:React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    try {
        const formData = new FormData();
        if(newSelectedImage){
            formData.append("file", newSelectedImage)
            const { data } = await axios.post("/api/upload", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setProfilePic(data.url)
            setToast({type: "success", msg: "Image updated successfully"})
            setTimeout(() => {
              setToast(null)
            }, 5000)
        }
    } catch (error) {
        setToast({type: "danger", msg: "Something went wrong with the upload"})
        setTimeout(() => {
          setToast(null)
        }, 5000)
    }
  }
  

  return (
    <div className="flex flex-col items-center">
      <form  className="flex flex-col items-center">
        <div className="mb-4">
          <label
            className="mb-1 block text-sm font-medium text-white"
            htmlFor="view_model_avatar"
          >
            Upload a profile picture
          </label>
          <div className="relative">
            <input
              onChange={(e) => handleImageChange(e)}
              className="border-gray-300 focus:ring-blue-600 block w-full overflow-hidden cursor-pointer border text-gray-800 bg-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:border-transparent"
              aria-describedby="view_model_avatar_help"
              id="view_model_avatar"
              name="image"
              type="file"
            />
          </div>
          <div className="mt-1 text-sm text-gray-500" id="view_model_avatar_help">
            A profile picture is useful to confirm you are logged into your account
          </div>
        </div>
        <button
          type="submit"
          className="text-[#303030] bg-white px-4 py-2 rounded-lg text-sm cursor-pointer disabled:bg-slate-100 disabled:text-zinc-500 disabled:cursor-not-allowed"
          onClick={(e) => handleUpload(e)}
        >
          Save
        </button>
        {
          toast ? (
            <Toast toastType={toast.type} message={toast.msg} />
          ) : null
        }
      </form>

    </div>
  );
}
