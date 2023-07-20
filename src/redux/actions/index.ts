import { Dispatch } from '../../types';

export const SUBMIT_LOGIN = 'SUBMIT_LOGIN';

export const FETCH_CURRENCIES = 'FETCH_CURRENCIES';

export const INCLUDE_EXPENSE = 'INCLUDE_EXPENSE';

export const TOTAL_SUM = 'TOTAL_SUM';

export const DELETE_EXPENSE = 'DELETE_EXPENSE';

export const EXIT_EDIT = 'EXIT_EDIT';

export const EXPENSE_EDIT = 'EXPENSE_EDIT';

export const UPDATE_EXPENSES = 'UPDATE_EXPENSES';

export type ExpenseData = {
  value: string,
  description: string,
  currency: string,
  method: string,
  tag: string,
  exchangeRates?: any
};

export type ExpenseEditData = {
  id: number,
  value: string,
  description: string,
  currency: string,
  method: string,
  tag: string,
  exchangeRates?: any
};

type ExpenseEdit = {
  expense: ExpenseEditData,
  index: number,
};

export const submitLogin = (loginData: string) => ({
  type: SUBMIT_LOGIN,
  payload: loginData,
});

export const fetchCurrencies = (currencies: string[]) => ({
  type: FETCH_CURRENCIES,
  payload: currencies,
});

export function fetchCurrency() {
  return async (dispatch: Dispatch) => {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const data = await response.json();
    delete data.USDT;
    const array = Object.keys(data).map((key) => key);
    dispatch(fetchCurrencies(array));
  };
}

export const includeExpense = (expenseWithExchange: any) => ({
  type: INCLUDE_EXPENSE,
  payload: expenseWithExchange,

});

export const totalSum = (value: number) => ({
  type: TOTAL_SUM,
  payload: value,
});

export function addExpense(expenseData: ExpenseData) {
  return async (dispatch: Dispatch) => {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const data = await response.json();
    delete data.USDT;
    const fullObj = { ...expenseData, exchangeRates: data };
    const valueToAdd = ((parseFloat(expenseData.value)
      * data[expenseData.currency].ask));
    dispatch(totalSum(valueToAdd));
    dispatch(includeExpense(fullObj));
  };
}

export const deleteExpense = (expense: any, valueToRemove: number) => ({
  type: DELETE_EXPENSE,
  payload: expense,
  updateValue: valueToRemove,
});

export function removeExpense(expenseId: number, expenses: any) {
  return (dispatch: Dispatch) => {
    const findValue = expenses.find((el: any) => el.id === expenseId);
    const filtered = expenses.filter((el: any) => el.id !== expenseId);
    const valueTo = parseFloat(findValue.exchangeRates[findValue.currency].ask)
      * findValue.value;
    dispatch(deleteExpense(filtered, valueTo));
  };
}

export const exitEdit = () => ({
  type: EXIT_EDIT,
});

export const expenseEdit = ({ expense, index }: ExpenseEdit) => ({
  type: EXPENSE_EDIT,
  payload: { expense, index },
});

export const updateExpenses = (expenses: ExpenseEditData[]) => ({
  type: UPDATE_EXPENSES,
  payload: expenses,
});
