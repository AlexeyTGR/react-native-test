import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

type GalleryStateType = {
    images: string[] | [];
};

const initialState: GalleryStateType = {
    images: [],
};

const galleryReducer = createSlice({
    initialState,
    name: 'gallery',
    reducers: {
        setImages: (state, action: PayloadAction<string>) => {
            state.images.splice(0, 0, action.payload);
        },
    },
});

export const { setImages } = galleryReducer.actions;

export default galleryReducer.reducer;
