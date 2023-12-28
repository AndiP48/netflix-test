import fetcher from "@/lib/fetcher";
import useSWR from "swr";

function useMovieRandom() {
    const {data, isLoading} = useSWR("/api/movieRandom", fetcher, {
        revalidateOnReconnect: false,
        revalidateIfStale: false,
        revalidateOnFocus: false
    });

    return {data, isLoading}
}

export default useMovieRandom;