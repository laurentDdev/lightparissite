import {useQuery} from "react-query";
import axios from "axios";

export const useUsersRole = (id: string) => {
    return useQuery(["users", id], async () => {
        const { data } = await  axios.get(`/api/users/roles/${id}`)
        return data
    })
}
