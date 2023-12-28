import fetcher from "@/lib/fetcher";
import useSWR from "swr";

export default function useMovie(url: string) {
    const { data, isLoading } = useSWR((url) ? `/api/watch/${url}` : null, fetcher);

    return {data, isLoading}
}