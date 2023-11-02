import Links from "@/components/Links";



export default async function Preview() {
        return (
            <div className="flex-1 flex items-center justify-center">
                <div className="w-screen h-[500px] rounded-b-3xl fixed bg-[#633cff] top-0 left-0 -z-20"></div>
                <Links />
            </div>
        );
    
}
