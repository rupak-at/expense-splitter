import {configureStore} from "@reduxjs/toolkit"
import user from "./features/userSlice"
import group from "./features/groupSlice"

export const store = configureStore({
    reducer: {
        userDetails: user,
        groupDetails: group,
    }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

