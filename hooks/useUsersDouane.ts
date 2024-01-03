import {useQuery} from "react-query";
import axios from "axios";
import useSWR from "swr";
import {fetcher} from "@/lib/fetcher";

export const useUsersDouane = () => {
    const { data, error, isLoading } = useSWR("/api/users/roles/douane", fetcher)

    return {
        data,
        error,
        isFetching: isLoading,
    }
}
