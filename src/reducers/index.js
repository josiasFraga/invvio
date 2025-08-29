import { combineReducers } from 'redux';
import { appReducer } from './appReducer';
import { themeReducer } from './themeReducer';

const rootReducer = combineReducers({
  app: appReducer,    // nome mais semântico
  theme: themeReducer,
});

export default rootReducer;