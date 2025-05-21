import { createSlice, nanoid } from '@reduxjs/toolkit';
import { RootState } from '../../configureStore/store';
// interface User {
//     id: string;
//     name: string;
//     email: string;
// }

// interface FormState {
//     [key: string]: any;
// }

// interface UserState {
//     users: User[];
//     form: FormState;
// }

// const initialState: UserState = {
//     users: [] as User[],
//     form: {} as FormState
// }
// const userSlice = createSlice({
//     name: 'users',
//     initialState,
//     reducers: {
//         userAdded: (state, action) => {
//             state.users.push(action.payload)
//         },
//         formUpdated: (state, action) => {
//             state.form = action.payload
//         },
//         userUpdated: (state, action) => {
//             const { id, name, email } = action.payload
//             const existingUser = state.users.find(user => user.id === id)
//             if (existingUser) {
//                 existingUser.name = name
//                 existingUser.email = email
//             }
//         },
//     },
// }); 
const initialState = {
    users: [{
        id: nanoid(),
        name: '',
        // email: ''
    }],
    // form: {
    //   id: nanoid(),
    //   image: '',
    //   title: '',
    //   content: '',
    //   user: '',
    };
const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers:{}
})
export default userSlice.reducer;
export const selectAllUsers = (state:RootState) => state.users;
export const selectUserById = (state, userId) => state.users.find(user => user.id === userId);
export const { userAdded, formUpdated, userUpdated } = userSlice.actions;