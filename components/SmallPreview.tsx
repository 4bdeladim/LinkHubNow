"use client"
import { useQuery } from "@tanstack/react-query";
import Phone from "./Phone";
import { TNewLink, getLinks, getProfileInfo } from "@/lib/utils";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Skeleton } from "./ui/skeleton";
import { getIconComponent } from "@/lib/icons";
import { usePathname } from "next/navigation";

export default function SmallPreview(){
    const {
        data: links,
        error,
        isLoading,
    } = useQuery<TNewLink[]>(["links"], getLinks);
    const { data, isLoading:profileIsLoading } = useQuery(["profileInfo"], getProfileInfo);
    const pathName = usePathname();
    if(pathName === "/preview") {
        return null; 
    }
    return (
        <div className="bg-white w-[500px] rounded-md min-h-full hidden lg:flex justify-center items-center">
            <div className="w-[308px] relative flex flex-col gap-4 items-center">
                <Phone />
                {
                    data?.image ? (
                        <Image src={data.image} width={128} height={128} alt="Avatar" className="rounded-full border-[3px] border-[#633cff]" />
                    ) : <Skeleton className="h-32 w-32 rounded-full" />
                }
                {
                    data?.username ? (
                        <h2 className="">
                            { data.username }
                        </h2>
                    ) : <Skeleton className="h-6 w-32 rounded-full" />
                }
                {
                    links ? ( links?.map((link, index) => (
                        <div key={index} className="bg-[#633cff] px-4 py-2 rounded-md flex justify-center items-center gap-4 w-9/12">
                            {getIconComponent(link.icon, "light")}
                            <h1 className="text-white font-medium">{link.title}</h1>
                        </div>
                        
                    ))  ) : (
                        new Array(5).fill(0).map((e,index) => <Skeleton key={index} className="h-10 w-52 rounded-xl" />)
                    )
                }
            </div>            
        </div>
    )
}