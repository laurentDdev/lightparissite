import {useQuery} from "react-query";
import axios from "axios";

export const useUsersTeam = () => {
    return useQuery("usersTeam", async () => {
        const { data } = await axios.get("/api/users/team")
        return data
    })
};

