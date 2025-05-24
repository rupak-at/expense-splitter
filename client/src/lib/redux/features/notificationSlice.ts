import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    isNotificationShown: false
}

const notificationSlice = createSlice({
    name: "notification", 
    initialState, 
    reducers: {
        setNotificationTrue: (state) => {
            state.isNotificationShown = true
        },
        setNotificationFalse: (state) => {
            state.isNotificationShown = false
        }
    }
})

export const {setNotificationTrue, setNotificationFalse} = notificationSlice.actions
export default notificationSlice.reducer