import useMovie from "@/hook/useMovie";
import useMoviesModel from "@/hook/useMoviesModel";
import { useRouter } from "next/router";
import React, { useCallback } from "react";

import { FaPlayCircle} from "react-icons/fa";
import { IoIosArrowDropdown } from "react-icons/io";
import AddFavorite from "./addfavorite";

const InfoModel = () => {
    const router = useRouter();
    
    const movieid = useMoviesModel(state => state.movieid);

    const isVisible = useMoviesModel(state => state.isOpen);

    const closeModel = useMoviesModel(state => state.closeModel);

    const {data: movie} = useMovie(movieid as string);

    const watch = useCallback(() => {
        router.push(`/movies/${movieid}`)
    }, [movieid])

    return (
        <div className={`${(isVisible) ? "block" : "hidden"} fixed flex justify-center items-center left-0 top-0 bg-black bg-opacity-80 z-30 w-full h-full`}>
            <div className="bg-zinc-800 w-2/4">
                <video src={"/movies/" + movie?.movie} poster={"/movies/" + movie?.thumbnail}
                autoPlay muted loop
                className="object-fill w-full h-[280px]" />
                <div className="text-white p-4 flex flex-col gap-y-2">
                    <div className="flex text-3xl justify-between">
                        <div className="flex gap-x-3">
                        <FaPlayCircle className="cursor-pointer" onClick={watch} />
                        <AddFavorite movieid={movieid} />
                        </div>
                        <IoIosArrowDropdown className="rotate-180 cursor-pointer text-4xl" onClick={closeModel} />
                    </div>
                    <p className="text-green-400">New</p>
                    <p>{movie?.genre}</p>
                    <p>{movie?.synopsis}</p>
                </div>
            </div>
        </div>
    )
}

export default React.memo(InfoModel);