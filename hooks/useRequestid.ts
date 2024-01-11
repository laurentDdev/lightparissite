import { fetcher } from "@/lib/fetcher";
import useSWR from "swr";

export const useRequestid = (id: string) => {
    const { data, error, isLoading } = useSWR(`/api/request/view/${id}`, fetcher);
    return {
        data: data,
        error: error,
        isFetching: isLoading,
    }
}