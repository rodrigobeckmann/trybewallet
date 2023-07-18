import { AnyAction } from 'redux';
import { FETCH_CURRENCIES, TOTAL_SUM, INCLUDE_EXPENSE } from '../actions';

const INITIAL_STATE = {
  total: 0,
  currencies: '',
  expenses: [],
};

export default (state = INITIAL_STATE, action: AnyAction) => {
  switch (action.type) {
    case FETCH_CURRENCIES: return {
      ...state,
      currencies: action.payload,
    };

    case INCLUDE_EXPENSE: return {
      total: state.total,
      currencies: state.currencies,
      expenses: [...state.expenses, { id: state.expenses.length, ...action.payload }],
    };

    case TOTAL_SUM: return {
      ...state,
      total: state.total + action.payload,
    };

    default: return state;
  }
  return state;
};
