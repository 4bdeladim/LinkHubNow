import Links from "@/app/Components/Links";
import ReturnButton from "@/app/Components/ReturnButton";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";




export default async function View(){
    const session = await getServerSession(authOptions);
    const user = session?.user;
    if(!user){
        redirect("/")
    }
    const account = await prisma.account.findUnique({
        where: {
            userId: user?.id
        }
    })
    return (
        <div className="w-full flex h-screen justify-center items-center bg-black">
            <Link href="/edit"  className="absolute top-4 right-4" >
                <ReturnButton />
            </Link>
            { 
                account && <Links bio={account.bio} id={account.id} />  
            }
        </div>
    )
}