import EntranceImages from "@/component/entrance/entrance-images"
import { useMemo } from "react"
import { map } from "lodash"

export default function Entrance() {
    const images = useMemo(() => {
        return [
            "/images/default-blue.png", 
            "/images/default-green.png", 
            "/images/default-red.png",
            "/images/default-slate.png"
        ]
    }, [])


    return (
        <div className="bg-black h-screen w-full flex flex-col justify-center items-center">
            <div>
                <h1 className="text-white text-3xl font-sans text-center">Who is watching?</h1>
                <div className="grid grid-cols-4 gap-x-10 w-2/4 mx-auto mt-4">
                    {map(images, (value, index) => (
                        <EntranceImages key={index} img={value} />
                    ))}
                </div>
            </div>
        </div>
    )
}