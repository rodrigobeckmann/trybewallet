import { AnyAction } from 'redux';
import { EXPENSE_EDIT, EXIT_EDIT } from '../actions';

const INITIAL_STATE = {
  isEdit: false,
  index: 0,
  expense: {
    id: 0,
    value: '',
    description: '',
    currency: '',
    method: '',
    tag: '',
    exchangeRates: {},
  },
};

export default (state = INITIAL_STATE, action: AnyAction) => {
  switch (action.type) {
    case EXPENSE_EDIT: return {
      index: action.payload.index,
      isEdit: true,
      expense: action.payload.expense,
    };
    case EXIT_EDIT: return {
      ...INITIAL_STATE,
      isEdit: false,
    };
    default: return state;
  }
};
