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
        },
        removeGroup: (state) => {
            state.group = {
                _id: "",
                groupName: "",
                members: [],
                expenses: [],
                createdBy: "",
                createdAt: "",
                updatedAt: "",
            }
        }
    }
})

export const {setGroup, removeGroup} = groupSlice.actions
export default groupSlice.reducer