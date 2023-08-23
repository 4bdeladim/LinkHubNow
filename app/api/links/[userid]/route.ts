import { prisma } from "@/lib/prisma";
import { useRouter } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest){
    try {
        const url = request.url
        console.log(url)
        // const links = await prisma.link.findMany({
        //     where: {
        //         userId: id as string
        //     }
        // })
        // return NextResponse.json({ links })
    } catch (error) {
        return NextResponse.json({error: "Something went wrong"},  { status: 500 })
    }
}