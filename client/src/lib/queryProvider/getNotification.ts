import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetNotification = (id: string) =>{
    return useQuery({
        queryKey: ["notification", id],
        queryFn: async () => {
            try {
                const {data} = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/notification/${id}`, {withCredentials: true});
                return data.notifications
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    throw new Error(
                      error.response?.data?.message || 
                      error.message || 
                      "Group Creation failed"
                    );
                  }
                  throw new Error("Zero Notifications");
                
            }
        }
    })

}