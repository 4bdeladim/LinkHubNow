import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(request:NextRequest){
    try {
        const { bio } = await request.json();
        const session = await getServerSession(authOptions);
        const id = session?.user?.id;
        if(!bio || bio.length < 3) return NextResponse.json({error: "Bio must be more than 3 characters long"}, {status: 400})
        await prisma.account.update({
            where: {
                userId: id
            },
            data: {
                bio: bio as string,
            }
        })
        return NextResponse.json({message: "Bio updated successfully"})
    } catch (error) {
        return NextResponse.json({error: "Something went wrong"}, {status: 500})
    }
}

export async function GET(request:NextRequest){
    try {
        const session = await getServerSession(authOptions);
        const id = session?.user?.id
        const account = await prisma.account.findUnique({
            where: {
                userId: id
            }
        })
        return NextResponse.json({bio:account?.bio})
    } catch (error) {
        return NextResponse.json({error: "Something went wrong"}, {status: 500})
    }
}