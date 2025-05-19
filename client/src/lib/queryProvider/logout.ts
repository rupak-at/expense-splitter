import { useQuery, useQueryClient } from "@tanstack/react-query"
import axios from "axios";

export const useLogout = () => {
   const querClient = useQueryClient();

   const logout = async () => {
    try {
        const {data} = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/user/logout`, {withCredentials: true});
        querClient.clear();
        return data ? true : false
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(
              error.response?.data?.message || 
              error.message || 
              "Logout failed"
            );
          }
          throw new Error("Unknown login error");
    }
   }

   return {
    logout, 
    logoutQuery: useQuery({
        queryKey: ["logout"],
        queryFn: logout,
        enabled: false,
    })
   }
}