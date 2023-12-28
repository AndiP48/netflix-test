import { NextPageContext } from "next";
import { getSession } from "next-auth/react";

export async function getServerSideProps(context: NextPageContext) {
    const user = await getSession(context);

    if (!user) {
        return {
            redirect: {
                destination: "/login",
                permanent: false
            }
        }
    }

    return {
        props: {}
    }
}

export default function Loading() {
    return (
        <div className="bg-black fixed w-full h-screen left-0 top-0">
            <div className="text-white flex justify-center items-center h-screen">
                <p className="block p-5 border-r-4 border-white rounded-full animate-spin"></p>
                <p className="block ml-4 text-lg">Loading...</p>
            </div>
        </div>
    )
}