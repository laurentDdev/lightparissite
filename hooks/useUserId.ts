import {useQuery} from "react-query";
import axios from "axios";
import {usersWithRoleAndTeam} from "@/types";
import useSWR from "swr";
import {fetcher} from "@/lib/fetcher";

export const useUserId = (userId: string) => {
    const { data, error, isLoading } = useSWR(`/api/users/${userId}`, fetcher)
    return {
        data,
        error,
        isFetching: isLoading,
    }
}
