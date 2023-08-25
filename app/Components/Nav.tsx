import Link from "next/link";

export default function Nav(){
    return (
        <div className="flex justify-center gap-8 items-center h-[80px]">
            <Link href="/view" className="text-white text-lg">
                View
            </Link>
            <Link href="/edit" className="text-white text-lg">
                Edit
            </Link>
            <Link href="/bio" className="text-white text-lg">
                Bio
            </Link>
        </div>
    );
}