import { NextPageContext } from "next";
import { getSession } from "next-auth/react";

export async function gerServerSideProps(context: NextPageContext) {
    const user = await getSession(context);

    if (!user) {
        return {
            redirect: {
                destination: "/signin",
                permanent: false
            }
        }
    }

    return {
        props: {}
    }
}

export default function TwoBordersloading() {
    return (
        <div className="w-full bg-gray-800 h-screen fixed left-0 top-0">
            <div className="flex justify-center items-center h-screen">
                <div className="border-r-2 border-l-2 animate-spin relative w-36 h-36 border-pink-400 rounded-full"></div>
                <p className="block text-xl font-serif text-white absolute">Loading</p>
            </div>
        </div>
    )
}