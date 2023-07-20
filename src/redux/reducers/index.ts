import { combineReducers } from 'redux';
import user from './user';
import wallet from './wallet';
import walletEdit from './walletEdit';

const rootReducer = combineReducers({
  user,
  wallet,
  walletEdit,
});

export default rootReducer;
