import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Input } from "./ui/input";
import { socialMediaPlatforms } from "@/lib/icons";
import Dialog from "./Dialog";
import { TNewLink } from "@/lib/utils";
import { useEffect, useState } from "react";
interface IProps {
    id?: string,
    platformName: string,
    platformIcon: string,
    platformLink: string,
    // eslint-disable-next-line no-unused-vars
    deleteNewLink?: (index:number) => void ,
    index: number,
    // eslint-disable-next-line no-unused-vars
    changeValues: (index:number, link:TNewLink) => void 
}
export default function EditLink({id, platformName, platformIcon, platformLink, index, changeValues, deleteNewLink}: IProps) {
    const [title, setTitle] = useState("");
    const [icon, setIcon] = useState("");
    const [url, setUrl] = useState("");

    useEffect(() => {
        setTitle(platformName);
        setIcon(platformIcon);
        setUrl(platformLink);
    }, [])
    useEffect(() => {
        changeValues(index, {title, icon, url})
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [title, icon, url]);
    return (
        <section className="flex flex-col gap-4">
            <article className="space-y-4 rounded-md bg-[#fafafa] p-5 md:h-3/4">
                <header className="flex flex-row items-center justify-between">
                    <h2 className="text-lg font-bold text-[#777]">Link #1</h2>
                    {
                        id ? <Dialog  id={id} /> : null
                    }
                    {
                        deleteNewLink ? (<button className="text-[#777]" onClick={() => deleteNewLink(index)}>Remove</button>) : null
                    }
                </header>
                <div className="flex flex-col gap-2">
                    <label htmlFor="link-link">Link Title<span className="text-red-500"></span></label>
                    <div className="flex flex-col gap-4">
                            <Input
                                className="flex flex-row items-center gap-12 rounded border bg-white outline-none active:shadow active:ring-2 active:ring-bright"
                                type="text"
                                name="link"
                                onChange={(e) => setTitle(e.target.value)}
                                defaultValue={platformName}
                            />
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="link-platform">Platform</label>
                    <div className="relative transition-all">
                            <Select onValueChange={(selected) => setIcon(selected)}>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder={platformIcon.length > 1 ? platformIcon : "Link Icon"} />
                                </SelectTrigger>
                                <SelectContent  className="overflow-scroll h-40">
                                    {
                                        socialMediaPlatforms.map((title, index) => (
                                            <SelectItem className="cursor-pointer" key={index} value={title}>{ title }</SelectItem>
                                        ))
                                    }
                                </SelectContent>
                            </Select>
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="link-link">Link</label>
                    <div className="flex flex-col gap-4">
                            <Input
                                className="flex flex-row items-center gap-12 rounded border bg-white outline-none active:shadow active:ring-2 active:ring-bright"
                                type="text"
                                name="link"
                                onChange={(e) => setUrl(e.target.value)}
                                value={url}
                            />
                    </div>
                </div>
            </article>
        </section>
    );
}
