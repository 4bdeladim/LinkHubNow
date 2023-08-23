"use client";
import Modal from "@/app/Components/Modal";
import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";
type TLink = {
    title: string,
    link: string,
    icon: string
}
export default function Edit() {
    const { data } = useSession();
    const user = data?.user
    console.log(user?.id);
    const [links, setLinks] = useState<TLink[]>([]);
    useEffect(() => {
        fetchLinks()
    }, [])

    const fetchLinks = async () => {
        const { data } = await axios.get(`/api/links/${user?.id}`);
    }
    const saveLink = async (title:string, link:string, icon:string) => {
        const { data } = await axios.post("/api/links", {title, link, icon});
        console.log(data);
    }
    return (
        <div className="w-full gap-4 flex justify-center items-center flex-col">
            <Image
                width="180"
                height="180"
                src={user?.image as string}
                alt="Avatar"
                className="border rounded-full"
            />
            <h2 className="text-xl text-white">{user?.name}</h2>
            <Modal save={saveLink} />
        </div>
    );
}
