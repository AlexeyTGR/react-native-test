import { combineReducers } from 'redux';

import galleryReducer from './galleryReducers';

const rootReducer = combineReducers({
    galleryReducer,
});

export default rootReducer;
