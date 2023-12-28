import { NextPageContext } from "next";
import { getSession } from "next-auth/react";
import { useCallback, useState } from "react";

export async function getServerSideProps(context: NextPageContext) {
    const user = await getSession(context);

    if (!user) {
        return {
            redirect: {
                destination: "/singin",
                permanent: false
            }
        }
    }

    return {
        props: {}
    }
}

export default function SimpleTextLoading() {
    const [bool, setBool] = useState(true)

    const Idk = useCallback(() => {
        setBool((current) => !current)
    }, [setBool])

    const myAnimate = setInterval(Idk, 2000)
    
    return (
        <div className="bg-black w-full h-screen fixed left-0 top-0">
            <div className="flex text-white justify-center items-center h-screen">
                <p className="block font-mono text-2xl font-thin">Loading 
                <span className={`dot transition-all ${bool ? "opacity-0" : "opacity-100"}`}>.</span>
                <span className="dot transition-all">.</span>
                <span className="dot transition-all">.</span></p>
            </div>
        </div>
    )
}