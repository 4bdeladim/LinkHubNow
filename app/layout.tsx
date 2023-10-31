
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { NextAuthProvider } from "./AuthProvider";
import { ReactQueryProvider } from "./ReactQueryProvider";
import Nav from "@/components/Nav";
import SmallPreview from "@/components/SmallPreview";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "LinkHub",
    description: "Easily manage and share all your online links",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
      <NextAuthProvider>
        <ReactQueryProvider>
          <html lang="en">
              <body className={`${inter.className} w-screen min-h-screen flex py-8 items-center justify-center gap-8 flex-col bg-[#EDF2F8]`}>
                <Nav />
                <div className="flex-1 flex w-11/12 gap-8">
                  <SmallPreview />
                  {children}
                </div>
              </body>
          </html>
        </ReactQueryProvider>
      </NextAuthProvider>  
    );
}

