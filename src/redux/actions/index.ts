import { Dispatch } from '../../types';

export const SUBMIT_LOGIN = 'SUBMIT_LOGIN';

export const FETCH_CURRENCIES = 'FETCH_CURRENCIES';

export const INCLUDE_EXPENSE = 'INCLUDE_EXPENSE';

export const TOTAL_SUM = 'TOTAL_SUM';

type ExpenseData = {
  value: string,
  description: string,
  currency: string,
  method: string,
  tag: string,
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
    const valueToAdd = parseFloat((parseFloat(expenseData.value)
      * data[expenseData.currency].ask).toFixed(2));
    dispatch(totalSum(valueToAdd));
    dispatch(includeExpense(fullObj));
  };
}
