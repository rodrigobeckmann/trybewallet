import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';

export type UserRedux = {
  email: string,
};

export type WalletRedux = {
  total: number,
  currencies: string[],
  expenses: string[],
};

export type RootRedux = {
  user: UserRedux,
  wallet: WalletRedux,
};

export type Dispatch = ThunkDispatch<RootRedux, null, AnyAction>;
