import {useQuery} from "react-query";
import axios from "axios";

export const useTeams = () => {
  return useQuery("teams", async () => {
    const { data } = await axios.get("/api/teams");
    return data;
  });
};

