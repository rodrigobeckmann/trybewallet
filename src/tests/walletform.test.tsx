import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';
import mockData from './helpers/mockData';
import mockArray from './helpers/mockArray';
import Wallet from '../pages/Wallet';
import resolvedData from './helpers/resolvedData';

const LOGIN = 'user@email.com';
const PASSWORD = '123456';

const EMAIL_TEST = 'email-input';
const PASSWORD_TEST = 'password-input';
const VALUE_INPUT = 'value-input';
const DESCRIPTION_INPUT = 'description-input';
const CURRENCY_INPUT = 'currency-input';
const METHOD_INPUT = 'method-input';
const TAG_INPUT = 'tag-input';

const INITIAL_STATE = {
  user: {
    email: LOGIN,
  },
  wallet: {
    idCount: 0,
    total: 0,
    currencies: mockArray,
    expenses: [],
  },
};

const valueSpent = '50';
const valueDescription = 'banana';
const coin = 'USD';
const method = 'Dinheiro';
const tag = 'Alimentação';

const EXPECTED_STATE = {
  user: {
    email: LOGIN,
  },
  wallet: {
    idCount: 1,
    total: 237.66,
    currencies: mockArray,
    expenses: [
      {
        id: 0,
        value: valueSpent,
        description: valueDescription,
        currency: coin,
        method,
        tag,
        exchangeRates: resolvedData,
      }],
  },
};

describe('Testa componente WalletForm', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  beforeEach(() => {
    global.fetch = vi.fn().mockResolvedValue({
      json: async () => (mockData),
    });
  });

  test('1- Verifica se ao clicar em entrar com dados validos redireciona para /carteira', async () => {
    renderWithRouterAndRedux(<App />);

    const loginInput = screen.getByTestId(EMAIL_TEST);
    const passwordInput = screen.getByTestId(PASSWORD_TEST);

    await userEvent.type(loginInput, LOGIN);
    await userEvent.type(passwordInput, PASSWORD);

    const sendBtn = screen.getByRole('button', { name: 'Entrar' });

    await userEvent.click(sendBtn);

    expect(screen.getByTestId('email-field')).toHaveTextContent(`Usuario:${LOGIN}`);
    expect(screen.getByTestId('total-field')).toHaveTextContent('0.00');
    expect(screen.getByTestId('header-currency-field')).toHaveTextContent('cambio utilizado: BRL');
    expect(global.fetch).toBeCalledTimes(1);
  });

  test('2- verificar se são renderizados os inputs corretos no formulario e se é possivel digitar valores neles', async () => {
    renderWithRouterAndRedux(<Wallet />, { initialState: INITIAL_STATE });

    expect(screen.getByTestId('email-field')).toHaveTextContent(`Usuario:${LOGIN}`);
    expect(screen.getByTestId('total-field')).toHaveTextContent('0.00');
    expect(screen.getByTestId('header-currency-field')).toHaveTextContent('cambio utilizado: BRL');

    const valueInput = screen.getByTestId(VALUE_INPUT);
    const descriptionInput = screen.getByTestId(DESCRIPTION_INPUT);
    const currencyInput = screen.getByTestId(CURRENCY_INPUT);
    const methodInput = screen.getByTestId(METHOD_INPUT);
    const tagInput = screen.getByTestId(TAG_INPUT);

    await userEvent.type(valueInput, valueSpent);
    await userEvent.type(descriptionInput, valueDescription);
    await userEvent.selectOptions(currencyInput, coin);
    await userEvent.selectOptions(methodInput, method);
    await userEvent.selectOptions(tagInput, tag);

    expect(valueInput).toHaveValue(valueSpent);
    expect(descriptionInput).toHaveValue(valueDescription);
    expect(currencyInput).toHaveValue(coin);
    expect(methodInput).toHaveValue(method);
    expect(tagInput).toHaveValue(tag);
  });
});

test('3- verifica se ao clicar no botar adicionar, os valores dos inputs são adicionados ao estado global', async () => {
  const { store } = renderWithRouterAndRedux(<Wallet />, { initialState: INITIAL_STATE });

  const valueInput = screen.getByTestId(VALUE_INPUT);
  const descriptionInput = screen.getByTestId(DESCRIPTION_INPUT);
  const currencyInput = screen.getByTestId(CURRENCY_INPUT);
  const methodInput = screen.getByTestId(METHOD_INPUT);
  const tagInput = screen.getByTestId(TAG_INPUT);
  const sendBtn = screen.getByRole('button', { name: 'Adicionar despesa' });

  await userEvent.type(valueInput, valueSpent);
  await userEvent.type(descriptionInput, valueDescription);
  await userEvent.selectOptions(currencyInput, coin);
  await userEvent.selectOptions(methodInput, method);
  await userEvent.selectOptions(tagInput, tag);

  await userEvent.click(sendBtn);

  expect(global.fetch).toBeCalledTimes(1);
  expect(store.getState()).toStrictEqual(EXPECTED_STATE);
});
