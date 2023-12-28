import useMovieRandom from "@/hook/useMovieRandom";
import useMoviesModel from "@/hook/useMoviesModel";
import { useRouter } from "next/router";
import React from "react";
import { FaPlayCircle, FaInfoCircle } from "react-icons/fa"

const Thumbnail = () => {
    const {data: movie} = useMovieRandom();

    const router = useRouter();

    const openModel = useMoviesModel(state => state.openModel);

    return (
        <div>
            <div className="bg-black w-full h-[400px] bg-opacity-30 z-20 absolute left-0 top-0"></div>
            <video src={`/movies/${movie?.movie}`}  
             autoPlay muted loop 
             className="relative h-[400px] left-0 top-0 z-10 w-screen object-fill"/>
             <div className="absolute w-[400px] z-20 text-white top-2/4 -translate-y-[200px] ml-14">
                <h1 className="text-4xl font-serif">{movie?.title}</h1>
                <p className="text-sm text-justify font-sans mt-4">{movie?.synopsis}</p>
                <div className="mt-4 flex gap-x-12">
                    <button className="bg-white hover:bg-gray-200 flex transition-all items-center gap-x-2 rounded py-1 px-2 border-none outline-none text-black text-sm" onClick={() => router.push(`/movies/${movie?.id}`)}><FaPlayCircle className="self-center my-auto text-lg" /> Play</button>
                    <button className="bg-zinc-400 hover:bg-zinc-500 transition-all text-white flex items-center gap-x-2 rounded py-1 px-2 border-none outline-none text-sm" onClick={() => openModel(movie?.id)}><FaInfoCircle className="self-center my-auto text-lg" /> Info</button>
                </div>
             </div>
        </div>
    )
}

export default Thumbnail;