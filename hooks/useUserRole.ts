import axios from "axios"
import { useQuery } from "react-query"
import { User } from "@prisma/client"

export const useUserRole = (userEmail: string) => {
    return useQuery("userRole", async () => {
        const { data } = await axios.get(`/api/users/roles/${userEmail}`)
        return data as User
    })
}
