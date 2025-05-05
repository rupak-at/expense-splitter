import { useMutation } from "@tanstack/react-query"
import axios from "axios"
interface GroupBody {
    groupName: string;
    members: string[];
  }

export const makeGroup = () => {
    return useMutation({
        mutationFn: async (body: GroupBody) => {
            try {
                const {groupName, members} = body
                const {data} = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/group`, {
                    groupName,
                    userIds: members
                })
                return data
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
