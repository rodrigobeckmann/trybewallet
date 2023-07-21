import { AnyAction } from 'redux';
import {
  FETCH_CURRENCIES,
  TOTAL_SUM,
  INCLUDE_EXPENSE,
  DELETE_EXPENSE,
  UPDATE_EXPENSES,
} from '../actions';

const INITIAL_STATE = {
  idCount: 0,
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
      idCount: state.idCount + 1,
      total: state.total,
      currencies: state.currencies,
      expenses: [...state.expenses, { id: state.idCount, ...action.payload }],

    };

    case TOTAL_SUM: return {
      ...state,
      total: state.total + parseFloat(action.payload.toFixed(2)),
    };

    case DELETE_EXPENSE: return {
      ...state,
      total: parseFloat(state.total.toFixed(2))
        - parseFloat(action.updateValue.toFixed(2)),
      expenses: [...action.payload],
    };

    case UPDATE_EXPENSES: return {
      ...state,
      expenses: [...action.payload],
    };

    default: return state;
  }
};
