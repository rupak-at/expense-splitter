import { useMutation } from "@tanstack/react-query"
import axios from "axios"
interface GroupBody {
    name: string;
    members: string[];
  }

export const useMakeGroup = () => {
    return useMutation({
        mutationFn: async (body: GroupBody) => {
            try {
                const {name, members} = body
                const {data} = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/group`, {
                    groupName: name,
                    members
                }, {withCredentials: true})
                return data
            } catch (error) {
                if (axios.isAxiosError(error)) {
                  console.log(error)
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
