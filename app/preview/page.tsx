import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Image from "next/image";
import { getIconComponent } from "@/lib/icons";



export default async function Preview() {
    try {
        const session = await getServerSession(authOptions);
        const user = session?.user ;
        if(!user){
            redirect("/")
        } 
        const account = await prisma.account.findUnique({
            where: {
                userId: user?.id
            }
        })
        if(!account) redirect("/")
        const links = await prisma.link.findMany({
            where: {
                accountId: account.id
            }
        })
        return (
            <div className="flex-1 flex items-center justify-center">
                <div className="w-screen h-[500px] rounded-b-3xl fixed bg-[#633cff] top-0 left-0 -z-20"></div>
                <div className="rounded-lg border bg-card text-card-foreground shadow-sm flex flex-col items-center justify-center px-6 sm:px-12 py-10 min-w-[320px]">
                    <Image src={account.avatar as string} alt="Avatar" width={160} height={160} className="rounded-full text-center" />
                    <h2 className="font-bold text-center my-4">
                        { account.username }
                    </h2>
                    {
                        links.map((link, id) => (
                            <div key={id} className="flex justify-center items-center gap-4 bg-[#633cff] my-4 px-10 sm:px-24 py-2 rounded-md w-full">
                                {getIconComponent(link.icon, "light")}
                                <h4 className="text-white">
                                    { link.title }
                                </h4>
                            </div>
                        ))
                    }
                </div>
            </div>
        );
    } catch (error) {
        redirect("/");
    }
    
}
