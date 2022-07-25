import { combineReducers } from 'redux';

import galeryReducer from './galeryReducers';

const rootReducer = combineReducers({
    galeryReducer,
});

export default rootReducer;
