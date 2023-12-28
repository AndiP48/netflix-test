import { useRouter } from "next/router";
import React from "react";

import { FaPlayCircle} from "react-icons/fa";
import { IoIosArrowDropdown } from "react-icons/io";

import AddFavorite from "./addfavorite";
import useMoviesModel from "@/hook/useMoviesModel";

const Movie:React.FC<Variable> = ({ data }) => {
    const router = useRouter();

    const openModel = useMoviesModel(state => state.openModel)

    return (
        <div className="group delay-300 z-10 hover:translate-x-4 hover:-translate-y-4 hover:z-20 transition-all shadow-xl relative">
            <img src={"/movies/" + data?.thumbnail}
            className="h-52 object-cover w-full" />
            <div className="delay-300 z-20 grid group-hover:visible invisible absolute w-full bg-zinc-800 font-sans text-justify text-white rounded-bl-lg rounded-br-lg">
                <div className="text-lg p-4 flex flex-col gap-y-4">
                    <div className="flex justify-between text-3xl">
                        <section className="flex gap-x-4">
                            <FaPlayCircle className="cursor-pointer"
                            onClick={() => router.push(`/movies/${data?.id}`)} />
                            <AddFavorite movieid={data?.id} />
                        </section>
                        <IoIosArrowDropdown className="text-4xl cursor-pointer" onClick={() => openModel(data?.id)} />
                    </div>
                    <p className="text-green-500">New Trend</p>
                    <p>{data?.genre}</p>
                </div>
            </div>
        </div>
    )
}

export default React.memo(Movie);