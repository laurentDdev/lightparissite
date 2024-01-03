import {useQuery} from "react-query";
import axios from "axios";
import {Team} from "@prisma/client";
import {fetcher} from "@/lib/fetcher";
import useSWR from "swr";

export const useTeams = () => {
    const { data, error, isLoading } = useSWR("/api/teams", fetcher)

    return {
        data,
        error,
        isFetching: isLoading,
    }

}
