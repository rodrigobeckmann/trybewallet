import { AnyAction } from 'redux';

const INITIAL_STATE = {
  total: 0,
  currency: 'BRL',
};

export default (state = INITIAL_STATE, action: AnyAction) => {
  return state;
};
