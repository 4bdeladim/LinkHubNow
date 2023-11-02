"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import Toast from "@/components/Toast";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import UploadImage from "@/components/UploadImage";
import { getProfileInfo } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { redirect } from "next/navigation";

export default function Bio() {
    const [newBio, setBio] = useState<string>("");
    const [newUsername, setUsername] = useState<string>("");
    const [profilePic, setProfilePic] = useState<string>("");
    const [error, setError] = useState<{
        type: "danger" | "success";
        msg: string;
    } | null>(null);
    const session = useSession();
    const user = session?.data?.user;
    if(!user) {
        redirect("/");
    }
    const { data, isLoading } = useQuery(["profileInfo"], getProfileInfo);
    
    async function setProfileInfo(){
        const data = await getProfileInfo();
        setUsername(data.username);
        setBio(data.bio);
    }
    useEffect(() => {
        setProfileInfo();
    }, []);
    const changeProfileInfo = async (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        try {
            if (newUsername === data.username && newBio === data.bio) {
                setError({
                    type: "danger",
                    msg: "You haven't changed neither the username or bio",
                });
                return;
            }
            await axios.post("/api/profile", {
                bio: newBio,
                username: newUsername,
            });
            setError({ type: "success", msg: "Data updated successfully" });
        } catch (error: any) {
            setError({ type: "danger", msg: error.response.data.error });
            return null;
        }
    };
    return (
        <div className="rounded-md bg-white w-full flex flex-col h-[calc(100vh - 80px)] flex justify-center items-center flex-1">
            {isLoading ? (
                <>
                <Skeleton className="w-[200px] h-[200px] rounded-full" />
                <Skeleton className="w-[154px] h-[50px] rounded-md my-4" />
                <form className="flex flex-col gap-4 rounded-md bg-smoke p-5 w-full">
                    <Label>Username: </Label>
                    <Skeleton className="h-[40px] w-full rounded-md" /> 
                    <Label>Bio: </Label>
                    <Skeleton className="h-[80px] w-full rounded-md" />
                    <button
                        className="active:shadow-active rounded-md bg-[#633cff] w-full py-[12px] text-lg font-semibold text-white disabled:cursor-not-allowed disabled:opacity-75 "
                        disabled
                    >
                        Save
                    </button>
                </form>
            </>
            ) : (
                <>
                    <Image src={profilePic || data?.image || "/default-avatar.png"} height={200} width={200} alt="Avatar" className="rounded-full" />
                    <UploadImage setProfilePic={setProfilePic} />
                    <form className="flex flex-col gap-4 rounded-md bg-smoke p-5 w-full">
                        <Label>Username: </Label>
                        <Input onChange={(e) => setUsername(e.target.value)} defaultValue={data?.username} />
                        <Label>Bio: </Label>
                        <Textarea onChange={(e) => setBio(e.target.value)} defaultValue={data?.bio} />
                        <button
                            className="active:shadow-active rounded-md bg-[#633cff] w-full py-[12px] text-lg font-semibold text-white active:bg-lila active:shadow-lila disabled:pointer-events-none disabled:bg-lila"
                            type="submit"
                            onClick={(e) => changeProfileInfo(e)}
                        >
                            Save
                        </button>
                    </form>
                    <button className="bg-red-500 px-6 py-2 rounded-md text-white font-medium"
                            type="submit"
                            onClick={() => signOut()}
                        >
                            Log out 
                        </button>
                    {error && (
                        <Toast toastType={error.type} message={error.msg} />
                    )}
                </>
            )}
        </div>
    );
}
