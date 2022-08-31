import { createSlice } from "@reduxjs/toolkit"

const initialValue = true

export const sliceMusic = createSlice({
    name: "music",
    initialState: {
        musics: initialValue
    },
    reducers: {
        saveMusic: (state, action) => {
            state.musics = !state.musics
        },
        deleteMusic: (state) => {
            state.musics = initialValue
        }
    }
})

export const { saveMusic, deleteMusic } = sliceMusic.actions;
export default sliceMusic.reducer;