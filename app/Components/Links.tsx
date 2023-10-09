import { getIconComponent } from "@/lib/icons";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import Image from "next/image";

type TProps = {
    id: string;
    bio:string,
    img: string
};
type TLink = {
    id: string;
    title: string;
    url: string;
    icon: string;
    accountId: string;
};
const Links = async ({ img, id, bio }: TProps) => {
    const accountLinks: TLink[] = await prisma.link.findMany({
        where: {
            accountId: id,
        },
    });
    return (
        <div className="flex flex-col gap-8 items-center">
            
            {
                img && (
                    <Image
                        width="180"
                        height="180"
                        src={img as string}
                        alt="Avatar"
                        className="border rounded-full"
                        loading="eager" 
                        priority={true}
                    />
                )
            }
            <h1 className="text-white my-2">
                { bio }
            </h1>
            {accountLinks.map((link) => {
                return (
                    <a
                        key={link.id}
                        href={link.url}
                        className="w-[320px] flex cursor-pointer justify-center gap-4  font-medium rounded-lg text-sm px-5 py-2.5 text-center items-center mr-2 my-1 bg-white text-black"
                    >
                        {getIconComponent(link.icon, "dark")}
                        {link.title}
                    </a>
                );
            })}
        </div>
    );
};

export default Links;
