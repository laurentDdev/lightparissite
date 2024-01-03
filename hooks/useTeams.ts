import {useQuery} from "react-query";
import axios from "axios";
import {Team} from "@prisma/client";

export const useTeams = () => {
    return useQuery("teams", async () => {
        const { data } = await axios.get("/api/teams")
        return data as Team[]
    })
}
