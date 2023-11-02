"use client"
import { getProfileInfo } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";


export default function Nav() {
    const pathName = usePathname();
    const session = useSession();
    const { data} = useQuery(["profileInfo"], getProfileInfo);
    if(!session.data?.user) return null;
    function copy() {
        if(data.username) {
            const domain = process.env.DOMAIN as string;
            const link = domain + "/" + data.username
            navigator.clipboard.writeText(link)
        }
    }
    return (
        <div className="flex justify-between gap-8 items-center h-[60px] rounded-md bg-white w-11/12 px-4">
            {
                pathName === "/preview" ? (
                    <>
                        <Link href="/" className="flex justify-center items-center px-3 sm:px-6 py-2 font-bold border text-[#633cff] border-[#633cff] rounded-md">
                            Back to editor
                        </Link>
                        <button className="flex justify-center items-center px-3 sm:px-6 py-2 font-bold text-white bg-[#633cff] rounded-md" onClick={copy}>
                            Share Link
                        </button>
                    </>
                ) : (
                    <>
                        <h1 className="font-bold sm:block hidden">LinkHubNow</h1>
            <div className="flex gap-6">
                <Link
                    href="/"
                    className={`flex cursor-pointer select-none flex-row items-center gap-2 rounded-lg px-4 py-2 transition-all duration-100 ${pathName === "/edit" ? "bg-[#efebff]" : ""}`}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="none"
                        viewBox="0 0 16 16"
                        className="z-10 h-5 w-5"
                    >
                        <path
                            fill={`${pathName === "/edit" ? "#633cff" : "currentColor"}`}
                            d="M8.523 11.72a.749.749 0 0 1 0 1.063l-.371.371A3.751 3.751 0 1 1 2.847 7.85l1.507-1.506A3.75 3.75 0 0 1 9.5 6.188a.753.753 0 0 1-1 1.125 2.25 2.25 0 0 0-3.086.091L3.908 8.91a2.25 2.25 0 0 0 3.183 3.183l.37-.371a.748.748 0 0 1 1.062 0Zm4.63-8.874a3.756 3.756 0 0 0-5.305 0l-.371.37A.751.751 0 1 0 8.539 4.28l.372-.37a2.25 2.25 0 0 1 3.182 3.182l-1.507 1.507a2.25 2.25 0 0 1-3.086.09.753.753 0 0 0-1 1.125 3.75 3.75 0 0 0 5.144-.152l1.507-1.507a3.756 3.756 0 0 0 .002-5.307v-.001Z"
                        ></path>
                    </svg>
                    <h2 className={`hidden font-medium  xl:block ${pathName === "/edit" ? "text-[#633cff]" : ""}`}>Links</h2>
                </Link>
                <Link href="/profile" className={`flex cursor-pointer select-none flex-row items-center gap-2 rounded-lg px-4 py-2 transition-all duration-100 ${pathName === "/profile" ? "bg-[#efebff]" : ""}`}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="none"
                        viewBox="0 0 21 20"
                        className="z-10 h-5 w-5"
                    >
                        <path
                            fill={`${pathName === "/profile" ? "#633cff" : "currentColor"}`}
                            d="M10.5 1.563A8.437 8.437 0 1 0 18.938 10 8.447 8.447 0 0 0 10.5 1.562ZM6.716 15.357a4.688 4.688 0 0 1 7.568 0 6.54 6.54 0 0 1-7.568 0Zm1.596-5.982a2.188 2.188 0 1 1 4.376 0 2.188 2.188 0 0 1-4.376 0Zm7.344 4.683a6.523 6.523 0 0 0-2.265-1.83 4.062 4.062 0 1 0-5.782 0 6.522 6.522 0 0 0-2.265 1.83 6.562 6.562 0 1 1 10.304 0h.008Z"
                        ></path>
                    </svg>
                    <h2 className={`hidden font-medium  xl:block ${pathName === "/profile" ? "text-[#633cff]" : ""}`}>Profile Details</h2>
                </Link>
            </div>
            <Link className="rounded-md border border-bright bg-transparent px-[14px] py-[8px] text-center text-base font-semibold text-bright active:bg-snow disabled:pointer-events-none disabled:opacity-25" href="/preview">Preview</Link>
                    </>
                )
            }
            
        </div>
    );
}
