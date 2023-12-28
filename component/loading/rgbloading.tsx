import { NextPageContext } from "next";
import { getSession } from "next-auth/react";

export default function rgbLoading( ) {
    return (
        <div className="bg-black w-full h-screen fixed left-0 top-0">
            <div className="flex justify-center items-center h-screen">
                <div className="block relative border-4 shadow-inner shadow-gray-800 border-gray-950 p-20 rounded-full">
                    <div className="absolute p-20 shadow-xl animate-spin shadow-blue-500 left-0 top-0 rounded-full"></div>
                    <div className="absolute p-20 shadow-inner animate-spin shadow-indigo-600 left-0 top-0 rounded-full"></div>
                </div>
            </div>
        </div>
    )
}

export async function getServerSideProps(context: NextPageContext) {
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