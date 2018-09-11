import {combineReducers} from 'redux';   //合并reducer;
import counter from './counter';
import user from './user';

const rootReducer = combineReducers({
    counter,  // counter:counter
    user      //user:user
});

export default rootReducer;