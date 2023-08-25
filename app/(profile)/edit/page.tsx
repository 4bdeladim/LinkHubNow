
"use client";
import Modal from "@/app/Components/Modal";
import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import {  getIconComponent } from "@/lib/icons";

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
    const [links, setLinks] = useState<TLink[]>([]);
    const [loading, setLoading] = useState(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        const getLinks = async () => {
            const response = await axios.get(`/api/links/${userId}`);
            const links:TLink[] = response.data.links
    
            setLinks(links)
        }
        if(userId) getLinks()
    }, [userId])
    
    const saveLink = async (title: string, link: string, icon: string) => {
        try {
            setLoading(true);
            const response = await axios.post("/api/links", {
                title,
                link,
                icon,
            });
            const data: IPostResponse = response.data;
            setLinks(data.links);
            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    };
    return (
        <div className="w-full gap-4 flex justify-center items-center flex-col">
            {
                user?.image && (
                    <Image
                        width="180"
                        height="180"
                        src={user?.image as string}
                        alt="Avatar"
                        className="border rounded-full"
                        loading="eager" 
                        priority={true}
                    />
                )
            }
            { links.map((e) => (
                <a
                key={e.id}
                href={e.link}
                className="w-[320px] flex cursor-pointer justify-center gap-4 font-medium rounded-lg text-sm px-5 py-2.5 text-center items-center mr-2 my-1 bg-white text-black"
                >
                    { getIconComponent(e.title, "dark") }
                    {e.title}
                </a>
            ))}
            <Modal save={saveLink} loading={loading} />
        </div>
    );
}
