import { combineReducers } from 'redux';

import galleryReducer from './galleryReducers';
import themeReducer from './themeReducer';

const rootReducer = combineReducers({
    galleryReducer,
    themeReducer,
});

export default rootReducer;
