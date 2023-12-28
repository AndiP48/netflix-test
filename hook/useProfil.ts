import fetcher from "@/lib/fetcher"
import useSwr from "swr"

const useProfil = () => {
    const {data, isLoading, mutate} = useSwr("/api/user", fetcher, {
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
        revalidateIfStale: false
    })

    return {
        data,
        isLoading,
        mutate
    }
}

export default useProfil;