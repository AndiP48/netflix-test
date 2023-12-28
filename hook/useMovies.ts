import fetcher from "@/lib/fetcher";
import useSWR from "swr";

export default function useMovies() {
    const {data = [], isLoading} = useSWR("/api/movies", fetcher, {
        revalidateOnReconnect: false,
        revalidateOnFocus: false,
        revalidateIfStale: false
    })

    return {
        data,
        isLoading
    }
}