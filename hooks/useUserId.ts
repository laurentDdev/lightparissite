import {useQuery} from "react-query";
import axios from "axios";
import {usersWithRoleAndTeam} from "@/types";

export const useUserId = (userId: string) => {
    return useQuery(["user", userId], async () => {
      const { data } = await axios.get(`/api/users/${userId}`)
      return data as usersWithRoleAndTeam;
    })
}
