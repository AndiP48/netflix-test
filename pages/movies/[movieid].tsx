import { useRouter } from "next/router"
import useMovie from "@/hook/useMovie";
import { IoArrowBack } from "react-icons/io5";

export default function Watch() {
    const router = useRouter();

    const { movieid } = router.query;

    const {data: movie} = useMovie(movieid as string);

    return (
        <div className="bg-black w-full fixed left-0 top-0 h-screen">
            <nav className="text-white text-2xl gap-x-3 mt-4 fixed top-0 left-0 ml-14 flex">
                <IoArrowBack className="self-center text-4xl cursor-pointer" 
                onClick={() => router.back()} />
                <h1>{movie?.title}</h1>
            </nav>
            <div>
                <video src={movie?.movie} controls autoPlay
                className="w-full fixed bottom-0 h-[500px]" />
            </div>
        </div>
    )
}