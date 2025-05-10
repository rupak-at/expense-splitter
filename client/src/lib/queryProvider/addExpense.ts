import { useMutation } from "@tanstack/react-query"
import axios, { isAxiosError } from "axios"
interface AddExpenseBody {
    title: string
    amount: number
    description: string
    groupId: string
}

export const addExpense = () => {
    return useMutation({
        mutationFn : async(body: AddExpenseBody) => {
            try {
                const {data} = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/expense`, 
                    body
                , {withCredentials: true})

                return data.expense

            } catch (error) {
                if (isAxiosError(error)) {
                    throw new Error(
                      error.response?.data?.message || 
                      error.message || 
                      "Failed to add expense"
                    );
                  }
                  throw new Error("Unknown login error");
            }
        }
    })
}