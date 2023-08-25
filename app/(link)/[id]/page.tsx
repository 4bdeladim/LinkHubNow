import Links from "@/app/Components/Links";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";

export default async function UserLinks({ params }: { params: { id: string } }){
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id
    const account = await prisma.account.findUnique({
        where: {
            userId
        }
    })
    return (
        <div className="bg-black w-screen flex h-screen justify-center items-center">
            {
                account && (
                    <Links id={params.id} bio={account?.bio} />
                )
            }
        </div>
    )
}