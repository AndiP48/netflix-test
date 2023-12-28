import fetcher from "@/lib/fetcher";
import useSWR from "swr";

function useFavorites() {
    const { data = [], isLoading, mutate } = useSWR("/api/favorites", fetcher, {
        revalidateOnReconnect: false,
        revalidateOnFocus: false,
        revalidateIfStale: false,
    });

    return{
        data,
        isLoading,
        mutate
    }
}

export default useFavorites;