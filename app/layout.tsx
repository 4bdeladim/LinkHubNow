import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { NextAuthProvider } from "./AuthProvider";
import { ReactQueryProvider } from "./ReactQueryProvider";

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
              <body className={`${inter.className} bg-black flex justify-center flex-col`}>
                {children}
              </body>
          </html>
        </ReactQueryProvider>
      </NextAuthProvider>  
    );
}
