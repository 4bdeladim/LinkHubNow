import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";


export async function GET(){
    try {
        const session = await getServerSession(authOptions);
        const id = session?.user?.id
        const account = await prisma.account.findUnique({
            where: {
                userId: id
            }
        })
        return NextResponse.json({bio:account?.bio, username: account?.username, image: account?.avatar});
    } catch (error) {
        return NextResponse.json({error: "Something went wrong"}, {status: 500})
    }
}

export async function POST(request:NextRequest){
    try {
        const { bio, username } = await request.json();
        const session = await getServerSession(authOptions);
        const id = session?.user?.id;
        if(!bio || !username) return NextResponse.json({error: "Username and bio cannot be empty"}, {status: 401})
        if(bio.length < 3) return NextResponse.json({error: "Bio must be more than 3 characters long"}, {status: 401})
        if(username.length < 4) return NextResponse.json({error: "Username must be 4 or more characters"}, {status:401});

        await prisma.account.update({
            where: {
                userId: id
            },
            data: {
                bio,
                username,
            }
        })
        return NextResponse.json({message: "Data updated successfully"})
    } catch (error) {
        console.log(error);
        return NextResponse.json({error: "Username is not available"}, {status: 500})
    }
}