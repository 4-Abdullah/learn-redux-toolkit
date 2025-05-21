import { configureStore } from '@reduxjs/toolkit';
import countReducer from '../features/counter/counterSlice.ts'; 
import postSlice from '../features/posts/postSlice.ts';
import userSlice from '../features/users/userSlice.ts';
import authSlice from '../features/auth/authslice.ts'
export const store = configureStore({
    reducer: {
        // counter: countReducer,
        posts: postSlice,
        // users: userSlice,
        // auth:  authSlice
    },
});
// Infer the type of `store`
export type AppStore = typeof store
// Infer the `AppDispatch` type from the store itself
export type AppDispatch = typeof store.dispatch
// Same for the `RootState` type
export type RootState = ReturnType<typeof store.getState>