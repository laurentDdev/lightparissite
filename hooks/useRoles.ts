import {useQuery} from "react-query";
import axios from "axios";
import {Role} from "@prisma/client";
import useSWR from "swr";
import {fetcher} from "@/lib/fetcher";
export const useRoles = () => {
    const { data, error, isLoading } = useSWR("/api/roles", fetcher)

    return {
        data,
        error,
        isFetching: isLoading,
    }
}
