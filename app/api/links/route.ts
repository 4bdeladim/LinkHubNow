import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";


export async function POST(request: NextRequest) {
    const { title, link, icon } = await request.json();
    if (!title || typeof title !== "string") {
        return NextResponse.json(
            { error: "Title is invalid" },
            { status: 400 },
        );
    }
    if (!link || typeof link !== "string" || !isValidUrl(link)) {
        return NextResponse.json(
            { error: "Link is missing or invalid" },
            { status: 400 },
        );
    }
    if (!icon || typeof icon !== "string") {
        return NextResponse.json(
            { error: "Icon is missing or invalid" },
            { status: 400 },
        );
    }
    try {
        const session = await getServerSession(authOptions);
        const user = session?.user;
        if (!user) {
            return NextResponse.json(
                { error: "You are not authenticated" },
                { status: 401 },
            );
        }
        const userId = user.id;
        const account = await prisma.account.findUnique({
            where: {
                userId: userId,
            },
        });
        if (!account) {
            return NextResponse.json(
                { error: "Account not found" },
                { status: 404 },
            );
        }
        await prisma.link.create({
            data: {
                title,
                url: link,
                icon,
                accountId: account.id,
            },
        });
        const links = await prisma.link.findMany({
            where: {
                accountId: account.id,
            },
        });
        
        return NextResponse.json({
            message: "Link Created Successfully",
            links: links, 
        });
    } catch (error) {
        return NextResponse.json({ message: "Something went wrong" });
    }
}

function isValidUrl(url: string): boolean {
    try {
        new URL(url);
        return true;
    } catch (error) {
        return false;
    }
}


export async function GET(){
    try {
        const session = await getServerSession(authOptions);
        const id = session?.user?.id;
        const account = await prisma.account.findUnique({
            where: {
                userId: id
            }
        })
        const links = await prisma.link.findMany({
            where: {
                accountId: account?.id
            }
        });
        return NextResponse.json({links});
    } catch (error) {
        return NextResponse.json(
            { error: "Account not found" },
            { status: 404 },
        );
    }
}


export async function DELETE(request: NextRequest){
    try {
        const { id } = await request.json();
        const session = await getServerSession(authOptions);
        const userId = session?.user?.id;
        if (!userId) {
            return NextResponse.json(
              { error: "Unauthorized" },
              { status: 401 }
            );
        }      
        const account = await prisma.account.findUnique({
            where: {
                userId
            }
        })
        await prisma.link.delete({
            where: {
                id,
                accountId: account?.id
            }
        });
        return NextResponse.json({message: "Link Deleted"})
    } catch (error) {
        return NextResponse.json(
            {error: "Link not found"},
            { status: 404}
        )
    }
}