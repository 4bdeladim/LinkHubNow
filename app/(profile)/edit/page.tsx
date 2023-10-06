
"use client";
import Modal from "@/app/Components/Modal";
import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import {  getIconComponent } from "@/lib/icons";
import { useQuery } from "@tanstack/react-query";
import Dialog from "@/app/Components/Dialog";
import UploadImage from "@/app/Components/UploadImage";

type TLink = {
    title: string;
    link: string;
    icon: string;
    id: string;
};

interface IPostResponse {
    message: string;
    links: TLink[];
}

export default function Edit() {
    const { data } = useSession();
    const user = data?.user;
    const userId = user?.id;
    const [profilePic, setProfilePic] = useState<string>("");
    async function getProfileInfo() {
        const { data } = await axios.get("/api/profile");
        console.log(data)
        setProfilePic(data.image)
    }
    useEffect(() => {
        if(user) {
            getProfileInfo();
        }
    }, [user])
    const fetchLinksFromServer = async () => {
        const response = await axios.get('/api/links');
        return response.data.links;  
    }
    const { data: links, error, isLoading } = useQuery<TLink[]>(['links'], fetchLinksFromServer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        if(userId) fetchLinksFromServer()
    }, [userId]);

    return (
        <div className="w-full gap-4 flex justify-center items-center flex-col">
            {
                (profilePic) && (
                    <Image
                        width="180"
                        height="180"
                        src={profilePic}
                        alt="Avatar"
                        className="border rounded-full"
                        loading="eager" 
                        priority={true}
                    />
                )
            }
            <UploadImage setProfilePic={setProfilePic} />


            { links?.map((e:TLink) => (
                <div key={e.id} className="flex items-center">
                    <a
                    href={e.link}
                    className="w-[320px] flex cursor-pointer justify-center gap-4 font-medium rounded-lg text-sm px-5 py-2.5 text-center items-center mr-2 my-1 bg-white text-black"
                    >
                        { getIconComponent(e.icon, "dark") }
                        {e.title}
                    </a>
                    <Dialog id={e.id} />
                </div>
                
            ))}
            <Modal />
        </div>
    );
}
