export const SUBMIT_LOGIN = 'SUBMIT_LOGIN';

export const submitLogin = (loginData: string) => ({
  type: SUBMIT_LOGIN,
  payload: loginData,
});
