import {useQuery} from "react-query";
import axios from "axios";

export const useUsers = () => {
    return useQuery("users", async () => {
        const { data } = await axios.get("/api/users")
        return data
    })
}
