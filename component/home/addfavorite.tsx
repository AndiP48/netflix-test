import useFavorites from "@/hook/useFavorites";
import useProfil from "@/hook/useProfil";
import axios from "axios";
import { useCallback, useMemo } from "react";
import { includes } from "lodash"

import { FaRegStar, FaStar } from "react-icons/fa";


interface Variable {
    movieid: any
}

const AddFavorite:React.FC<Variable> = ({ movieid }) => {

    const {data: user, mutate: userMutate} = useProfil();

    const {mutate: favoritesMutate} = useFavorites()

    const isFavorite = useMemo(() => {
        const list = user?.movies || [];

        return includes(list, movieid);
    }, [user, movieid])

    const setFavorite = useCallback(async () => {

        let response;

        if (isFavorite) {
            response = await axios.patch("/api/favorite", {movieid})
        } else {
            response = await axios.post("/api/favorite", {movieid})
        }

        userMutate({
            ...user,
            movies: response?.data?.movies
        })

        favoritesMutate()

    }, [user, userMutate, favoritesMutate, isFavorite, movieid])

    return(
        <>
            {(isFavorite) ?
                <FaStar onClick={setFavorite} className="cursor-pointer" /> :
                <FaRegStar onClick={setFavorite} className="cursor-pointer" />
            }
        </>
    )
}

export default AddFavorite;