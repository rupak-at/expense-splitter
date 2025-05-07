import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    group: {
        _id: "",
        groupName: "",
        members: [],
        expenses: [],
        createdBy: "",
        createdAt: "",
        updatedAt: "",        

    }
}

const groupSlice = createSlice({
    name: "group", 
    initialState, 
    reducers: {
        setGroup: (state, action) => {
            state.group = action.payload
        }
    }
})

export const {setGroup} = groupSlice.actions
export default groupSlice.reducer