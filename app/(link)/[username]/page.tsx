import Links from "@/app/Components/Links";
import { prisma } from "@/lib/prisma";


export default async function UserLinks({ params }: { params: { username: string } }){
    const account = await prisma.account.findUnique({
        where: {
            username: params.username
        }
    })
    if(!account) {
        return (
            <div className="w-screen h-screen flex justify-center items-center">
                <h1 className="text-white text-4xl">NOT FOUND</h1>
            </div>
        )
    }
    else {
        return (
            <div className="bg-black w-screen flex h-screen justify-center items-center">
                {
                    account && (
                        <Links id={account.id} bio={account.bio} />
                    )
                }
            </div>
        )
    }
    
}