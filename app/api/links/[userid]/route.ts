import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";


export async function GET(request:NextRequest){
    try {
        const { pathname } = request.nextUrl;
        const userId = pathname.split("/")[3] as string;
        const account = await prisma.account.findUnique({
            where: {
                userId
            }
        })
        const links = await prisma.link.findMany({
            where: {
                accountId: account?.id
            }
        })
        return NextResponse.json({
            links: links, 
        });
    } catch (error) {
        return NextResponse.json({error: "Something went wrong"},  { status: 500 })
    }
}