import {useQuery} from "react-query";
import axios from "axios";
import {Role} from "@prisma/client";
export const useRoles = () => {
    return useQuery("roles", async () => {
        const { data } = await axios.get("/api/roles")
        return data as Role[]
    })
}
