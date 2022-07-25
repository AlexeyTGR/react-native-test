import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

type GaleryStateType = {
    images: string[] | [];
};

const initialState: GaleryStateType = {
    images: [],
};

const galeryReducer = createSlice({
    initialState,
    name: 'galery',
    reducers: {
        setImages: (state, action: PayloadAction<string>) => {
            state.images.splice(0, 0, action.payload);
        },
    },
});

export const { setImages } = galeryReducer.actions;

export default galeryReducer.reducer;
