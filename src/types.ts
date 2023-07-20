import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';

export type UserRedux = {
  email: string,
};

export type Expense = {
  id: number,
  value: string,
  description: string,
  currency: string,
  method: string,
  tag: string,
  exchangeRates: any,
};

export type ExchangeRate = {
  ask: string,
  name: string,
};

export type WalletRedux = {
  total: number,
  currencies: string[],
  expenses: Expense[],
};

export type WalletEditRedux = {
  isEdit: boolean,
  index: number,
  expense: Expense,
};

export type RootRedux = {
  user: UserRedux,
  wallet: WalletRedux,
  walletEdit: WalletEditRedux,
  expense: Expense,
};

export type Dispatch = ThunkDispatch<RootRedux, null, AnyAction>;
