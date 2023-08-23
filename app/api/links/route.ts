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
        const id = user.id;
        await prisma.link.create({
            data: {
                title,
                url: link,
                userId: id,
                icon,
            },
        });
        return NextResponse.json({ message: "Link Created Successfully" });
    } catch (error) {
        return NextResponse.json({ message: "Something went wrong"});
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
