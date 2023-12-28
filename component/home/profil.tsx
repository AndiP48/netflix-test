import { signOut } from "next-auth/react";
import React, { useCallback, useContext, useState } from "react";
import { FaChevronDown } from "react-icons/fa"
import { UserContext } from "./nav";

interface Variable {
    visible: boolean
}

const Profil:React.FC<Variable> = ({ visible }) => {
    const user = useContext(UserContext)

    return (
        <>
            <div className={`${visible ? "visible translate-y-28" : "invisible translate-y-20"} transition-all absolute p-5 translate-y-28 border border-zinc-700 w-32 bg-black text-white`}>
                <div className="flex justify-between border-b-2 pb-4 border-zinc-600">
                    <img src={user?.image} width="50px" height="50px" />
                    <p className="self-center">{user?.name}</p>
                </div>
                <button className="block bg-zinc-700 hover:bg-zinc-800 text-sm mx-auto p-1 mt-6 font-sans" 
                onClick={() => signOut({callbackUrl: "/login"})}>Sign Out</button>
            </div>
        </>
    )
}

export default Profil;