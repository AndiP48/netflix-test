import React, { useCallback } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import useProfil from "@/hook/useProfil";
import TwoBordersloading from "../loading/twobordersloading";
import Loading from "../loading/loading";

interface Variable {
    img: string
}

const EntranceImages:React.FC<Variable> = ({ img }) => {
    const router = useRouter();

    const {data: user, isLoading ,mutate} = useProfil()

    const imageUser = useCallback(async () => {
        let response;

        response = await axios.post("/api/updateuser", { img });

        mutate({
            ...user,
            image: response?.data?.image
        })

        if (response) {
            router.push("/");
        } else {
            console.error("cannot retrive response");
        }

    }, [img, user, mutate])

    if (isLoading) {
        return (
            <Loading />
        )
    }

    return(
        <div>
            <img className="cursor-pointer transition-all hover:ring-2 ring-white" src={img} width="100%" height="50px"
            onClick={imageUser} />
            <p className="text-zinc-400 text-center font-sans">{user?.name}</p>
        </div>
    )
}

export default EntranceImages;