import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import { TNewLink } from "@/lib/utils";


export async function POST(request: NextRequest) {
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
        const { links:requestLinks } = await request.json();
        const filtered = filterLinks(requestLinks, account.id);
        if(filtered.length < 1) {
            return NextResponse.json(
                {
                    error: "None of the links you entered are valid, check the url",
                    
                },
                { status: 401}
            );
        }
        await prisma.link.createMany({
            data: filtered,
        });
        const links = await prisma.link.findMany({
            where: {
                accountId: account.id,
            },
        });
        
        return NextResponse.json({
            message: "Links Created Successfully",
            links: links, 
        });
    } catch (error) {
        return NextResponse.json({ message: "Something went wrong" });
    }
}

function filterLinks(links:TNewLink[], accountId:string){
    const filteredLinks = links.filter((e:TNewLink) => isValidUrl(e.url) && Object.values(e).every((value) => typeof value === 'string' && value.trim() !== ''));
    const withAccountId = filteredLinks.map(e => {
        return {...e, accountId}
    })
    return withAccountId;
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