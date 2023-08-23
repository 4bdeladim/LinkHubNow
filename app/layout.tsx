import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { NextAuthProvider } from "./AuthProvider";

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
        <html lang="en">
            <body className={`${inter.className} bg-white dark:bg-black flex justify-center flex-col`}>
              {children}
            </body>
        </html>
      </NextAuthProvider>  
    );
}
