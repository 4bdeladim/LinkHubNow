
import { Inter } from "next/font/google";
import Nav from "../Components/Nav";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await getServerSession(authOptions);
    if(!session) {
        redirect("/");
    }
    return (
        <html lang="en">
            <body className={`${inter.className} bg-white dark:bg-black flex justify-center flex-col`}>
              <Nav />
              {children}
            </body>
        </html>
    );
}
