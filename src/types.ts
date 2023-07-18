export type UserRedux = {
  email: string,
};

export type WalletRedux = {
  total: number,
  currency: string,
};

export type RootRedux = {
  user: UserRedux,
  wallet: WalletRedux,
};
