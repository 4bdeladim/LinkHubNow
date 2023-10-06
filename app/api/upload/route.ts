import { prisma } from "@/lib/prisma";
import axios from "axios";
import { v2 as cloudinary } from "cloudinary";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";




export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ error: "User not found." }, { status: 404 });
    }
    const form = await req.formData()
    const cloudinaryResponse = await axios.post(
        `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/upload`,
        form,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          params: {
            api_key: process.env.CLOUDINARY_API_KEY,
            upload_preset: process.env.CLOUDINARY_UPLOAD_PRESET,
          },
        }
      );
      await prisma.account.update({
        where: {
          userId: session.user.id
        },
        data: {
          avatar: cloudinaryResponse.data.url
        }
      })
      await prisma.user.update({
        where: { id: session.user.id },
        data: {
          image: cloudinaryResponse.data.url,
        },
      });
      
    return NextResponse.json({url: cloudinaryResponse.data.url}, {status: 200})
  } catch (error:any) {
    console.error("Image upload error:", error.response);
    return NextResponse.json({ error: "Image upload failed." }, { status: 500 });
  }
}
