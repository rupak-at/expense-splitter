import { useQuery } from "@tanstack/react-query"
import axios from "axios"

export const getGroup = () => {
    return useQuery({
        queryKey: ["group"],
        queryFn: async () => {
            try {
                const {data} = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/group`, {withCredentials: true});
                return data.group[0]
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    throw new Error(
                      error.response?.data?.message || 
                      error.message || 
                      "Group Creation failed"
                    );
                  }
                  throw new Error("Unknown login error");
                
            }
        }
    })
}