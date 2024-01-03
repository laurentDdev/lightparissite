import {useQuery} from "react-query";
import axios from "axios";

export const useUsersDouane = () => {
    return useQuery(["users", "douane"], async () => {
        const { data } = await  axios.get(`/api/users/roles/douane`)
        return data
    })
}
