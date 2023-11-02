import Links from "@/components/Links";



export default async function UserLinks({ params }: { params: { username: string } }){
        return (
            <div className="w-screen flex h-screen justify-center items-center">
                <Links username={params.username} />
            </div>
        )
}