"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { TNewLink, addLinks, getLinks } from "@/lib/utils";
import Loading from "@/components/Loading";
import EditLink from "@/components/EditLink";
import { Skeleton } from "@/components/ui/skeleton";

type TLink = {
    title: string;
    url: string;
    icon: string;
    id: string;
};


export default function Edit() {
    const { data } = useSession();
    const user = data?.user;
    const userId = user?.id;
    const {
        data: links,
        error,
        isLoading,
    } = useQuery<TLink[]>(["links"], getLinks);
    const [newLinks, setNewLinks] = useState<TNewLink[]|null>(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        if (userId) getLinks();
    }, [userId]);

    function changeValues(index:number, linkValues:TNewLink) {
        if(!newLinks) return;
        const updatedLinks = [...newLinks];
        const realIndex = index - (links?.length || 0);
        if(updatedLinks.length > realIndex){
            updatedLinks[realIndex] = linkValues;
            setNewLinks(updatedLinks)
        }
        
    }
    function deleteNewLink(index:number){
        if(newLinks) {
            const realIndex = index - (links?.length || 0);
            const copiedArray = [...newLinks];
            copiedArray.splice(realIndex, 1);
            setNewLinks(copiedArray);
        }
    }
    function createNewLink(){
        if(newLinks !== null){
            setNewLinks([...newLinks, {icon: "", title: "", url: ""}])
        } else {
            setNewLinks([{icon: "", title: "", url: ""}])
        }
    }
    async function saveLinks(){
        if(!newLinks) return null ;
        const data = await addLinks(newLinks);
        const links = data.links;
        if(links) {

            setNewLinks(links);
        }
    }
    function isSaveDisabled(){
        if(newLinks){
            return newLinks.filter(e => Object.values(e).every((value) => typeof value === 'string' && value.trim() !== '' && value.length > 0)).length === 0
        }
        return true;
    }
    return (
        <div className="rounded-md bg-white w-full gap-4 flex justify-center items-center flex-col flex-1 p-8 max-h-[calc(100vh-156px)] overflow-scroll">
            {isLoading ? (
                <div className="w-full h-full">
                    <div className="h-[230px] w-full">
                        <div className="flex flex-col gap-2">
                            <h1 className="text-2xl font-semibold md:text-3xl">
                                Customize your links
                            </h1>
                            <p className="max-w-xs text-midnight md:max-w-xl text-[#777]">
                                Add/edit/remove links below and then share all your
                                profiles with the world!
                            </p>
                        </div>
                        
                    </div>
                    <div className="max-h-[calc(100%-300px)] overflow-scroll">
                        <div className="w-full flex flex-col gap-8">
                            {
                                new Array(5).fill(0).map((newLink, index) => (
                                    <Skeleton key={index} className="h-80 w-full" />
                                ))
                            }
                        </div>
                    </div>
                    <button onClick={saveLinks} disabled={isSaveDisabled()} className="rounded-md bg-[#633cff] text-base float-right font-semibold text-white py-2 px-4 mt-6 mb-8 disabled:opacity-50 disabled:cursor-not-allowed" type="button">Save</button>
                </div>
            ) : (
                <div className="w-full h-full">
                    <div className="h-[230px] w-full">
                        <div className="flex flex-col gap-2">
                            <h1 className="text-2xl font-semibold md:text-3xl">
                                Customize your links
                            </h1>
                            <p className="max-w-xs text-midnight md:max-w-xl text-[#777]">
                                Add/edit/remove links below and then share all your
                                profiles with the world!
                            </p>
                        </div>
                        <button onClick={createNewLink} className="w-full rounded-md my-4 border border-[#633cff] bg-transparent px-[16px] py-[12px] text-lg font-semibold text-[#633cff]" type="button">Add new link</button>
                        
                    </div>
                    <div className="max-h-[calc(100%-300px)] overflow-scroll">
                        <div className="w-full flex flex-col gap-8">
                            {
                                newLinks !== null ? (
                                    newLinks.map((newLink, index) => (
                                        <EditLink key={(index + 1) * 999} deleteNewLink={deleteNewLink} changeValues={changeValues} index={(links?.length || 0) + index} platformIcon={newLink.icon} platformLink={newLink.title} platformName={newLink.title} />
                                    ))
                                ) : null
                            }
                            <div className="flex flex-col gap-8 w-full pb-8 max-h-full overflow-scroll">
                                {
                                    links?.map((e: TLink, index) => (
                                        <EditLink id={e.id} platformName={e.title} index={index} key={index} platformIcon={e.icon} platformLink={e.url} changeValues={changeValues}  />
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                    <button onClick={saveLinks} disabled={isSaveDisabled()} className="rounded-md bg-[#633cff] text-base float-right font-semibold text-white py-2 px-4 mt-6 mb-8 disabled:opacity-50 disabled:cursor-not-allowed" type="button">Save</button>
                </div>
            )}
            
        </div>
    );
}
