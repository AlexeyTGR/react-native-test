/* eslint-disable no-param-reassign */
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

type ThemeType = {
    currentTheme: boolean;
};

const initialState: ThemeType = {
    currentTheme: false,
};

const themeReducer = createSlice({
    initialState,
    name: 'theme',
    reducers: {
        setTheme: (state, action: PayloadAction<boolean>) => {
            state.currentTheme = action.payload;
        },
    },
});

export const { setTheme } = themeReducer.actions;

export default themeReducer.reducer;
