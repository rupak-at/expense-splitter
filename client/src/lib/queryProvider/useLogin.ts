import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export const useLogin = () =>{
    return useMutation({
        mutationFn: async (body) => {
            try {
                const {data} = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/user/login`, body, {withCredentials: true})
                return data
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    throw new Error(
                      error.response?.data?.message || 
                      error.message || 
                      "Login failed"
                    );
                  }
                  throw new Error("Unknown login error");
                }

            }
        }
    )
}