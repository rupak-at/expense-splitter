import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    expense: [{
        _id: "",
        title: "",
        amount: 0,
        description: "",
        group: "",
        paidBy: {_id: "", userName: ""},
        createdAt: "",
        updatedAt: "",        
    }]
}

const expenseSlice = createSlice({
    name: "expense", 
    initialState, 
    reducers: {
        setExpense: (state, action) => {

            if (state.expense[0]._id === "" || undefined){
                state.expense.shift()
            }
            state.expense.push(action.payload)
        },
        removeExpense: (state) => {
            state.expense = []
        },
        fetchExpense: (state, action) => {
            state.expense = action.payload
        }
    }
})

export const { setExpense, removeExpense, fetchExpense } = expenseSlice.actions
export default expenseSlice.reducer