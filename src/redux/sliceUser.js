import { createSlice } from "@reduxjs/toolkit"

const initialValue = {
    fullName: "",
    username: "",
    email: "",
    id: "",
    role: "",
}

export const sliceUser = createSlice({
    name: "user",
    initialState: {
        users: initialValue
    },
    reducers: {
        saveAdmin: (state, action) => {
            const newUser = {...action.payload}
            state.users = newUser
        },
        deleteAdmin: (state) => {
            state.users = initialValue
        }
    }
})

export const { saveUser, deleteUser } = sliceUser.actions;
export default sliceUser.reducer;