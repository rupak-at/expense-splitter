import { useQuery } from "@tanstack/react-query"
import axios from "axios";

export const getSplit = (id: string) => {
    return useQuery({
        queryKey: ["split", id],
        queryFn: async () => {
            try {
                const {data} = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/split/${id}`, {withCredentials: true});
                return data.transactions
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