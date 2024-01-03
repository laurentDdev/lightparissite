import {useQuery} from "react-query";
import axios from "axios";
import {fetcher} from "@/lib/fetcher";
import useSWR from "swr";

export const useUsers = () => {
    const {data, error, isLoading } = useSWR("/api/users", fetcher)

    return {
        data,
        error,
        isFetching: isLoading,
    }
}
