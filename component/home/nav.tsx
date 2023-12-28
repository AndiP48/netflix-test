import { map } from "lodash"
import { Children, createContext, useCallback, useMemo, useState } from "react";
import { FaChevronDown, FaRegBell, FaSearch } from "react-icons/fa";
import Profil from "./profil";
import useProfil from "@/hook/useProfil";
import React from "react";

export const UserContext = createContext("" as any);

const Nav = () => {

    const {data: user} = useProfil()
    
    // map value
    const list: string[] = useMemo(() => ["Shop","Paok","Udin","Referece","Support"], []);

    return (
        <nav className="flex absolute right-0 left-0 mx-14 pt-4 justify-between z-30">
            <div className='flex'>
              <img src="/images/logo.png" width="80px" height="80px" />
              <div className="text-white flex ml-4 gap-x-8 font-sans">
                  {map(list, (value, index) => (
                    <p key={index} className="cursor-pointer">{value}</p>
                  ))}
              </div>
            </div>
            <div className='flex text-xl text-white items-center gap-x-6'>
              <FaRegBell />
              <FaSearch />
                <img src={user?.image} 
                width="40px" height="40px" className='relative' />
                <UserContext.Provider value={user}>
                    <ProfilSection  />
                </UserContext.Provider>
            </div>
        </nav>
        
    )
}

function ProfilSection() {
    const [downToggle, setDownToggle] = funcToggle(false);

    function funcToggle(e: any) {
        const [value, setValue] = useState(e);

        const set = useCallback(() => {
            setValue((n: any) => !n);
        }, [setValue])

        return [value, set];
    }

    return (
        <>
        <FaChevronDown onClick={setDownToggle} 
                className={`cursor-pointer transition-all transform ${downToggle ? "rotate-180" : "rotate-0"}`} />
        <Profil visible={downToggle} />
        </>
    )
}

export default React.memo(Nav);