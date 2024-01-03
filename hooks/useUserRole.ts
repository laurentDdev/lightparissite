import axios from "axios"
import { useQuery } from "react-query"
import { User } from "@prisma/client"
import useSWR from "swr";
import {fetcher} from "@/lib/fetcher";

export const useUserRole = (userEmail: string) => {
    const {data , error, isLoading} = useSWR(`/api/users/roles/${userEmail}`, fetcher)

    return {
        data,
        error,
        isFetching: isLoading,
    }
}
