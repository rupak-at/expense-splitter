import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    user: {}
}

const useSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload
        }
    }
})

export const { setUser } = useSlice.actions
export default useSlice.reducer