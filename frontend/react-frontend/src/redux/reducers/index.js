import { combineReducers } from 'redux';

import account from './account';
import election from './election';

const allReducers = combineReducers({
  account,
  election,
});
export default allReducers;
