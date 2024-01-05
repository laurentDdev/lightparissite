import {fetcher} from "@/lib/fetcher";
import useSWR from "swr";

export const useRequests = (type: string) => {
    const {data, error, isLoading} = useSWR(`/api/request/${type}`, fetcher)

    return {
        data,
        error,
        isFetching: isLoading,
    }
}
