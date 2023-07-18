import { AnyAction } from 'redux';
import { SUBMIT_LOGIN } from '../actions';

const INITIAL_STATE = {
  email: '',
};

export default (state = INITIAL_STATE, action: AnyAction) => {
  switch (action.type) {
    case SUBMIT_LOGIN: {
      return { email: action.payload };
    }
    default: return state;
  }
};
