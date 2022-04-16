import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
    name: 'ui',
    initialState: {
        colorsPool: [],
        showSpinner: true,
        darkMode: false,
        en: true
    },
    reducers: {
        setColorsPool: (state, action) => {
            state.colorsPool = action.payload;
        },
        setShowPinner: (state, action) => {
            state.showSpinner = action.payload
        },
        setDarkMode: (state, action) => {
            state.darkMode = action.payload
        },
        setEn: (state, action) => {
            state.en = action.payload
        }
    }
});

export const uiActions = uiSlice.actions;
export default uiSlice;