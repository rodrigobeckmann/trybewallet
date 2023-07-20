import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import mockData from './helpers/mockData';
import mockArray from './helpers/mockArray';
import Wallet from '../pages/Wallet';
import resolvedData from './helpers/resolvedData';

const LOGIN = 'user@email.com';
const DESCRIPTION_INPUT = 'description-input';

const valueSpent = '50';
const valueDescription = 'banana';
const coin = 'USD';
const method = 'Dinheiro';
const tag = 'Alimentação';

const expenseOne = {
  id: 0,
  value: valueSpent,
  description: valueDescription,
  currency: coin,
  method,
  tag,
  exchangeRates: resolvedData,
};

const EXPECTED_STATE = {
  user: {
    email: LOGIN,
  },
  wallet: {
    idCount: 1,
    total: 0,
    currencies: mockArray,
    expenses: [],
  },
  walletEdit: {
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
  },
};

const INITIAL_STATE = {
  user: {
    email: LOGIN,
  },
  wallet: {
    idCount: 1,
    total: 237.66,
    currencies: mockArray,
    expenses: [expenseOne],
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

  test('1- verifica se é clicar em excluir a despesa some da tabela e do estado', async () => {
    const { store } = renderWithRouterAndRedux(<Wallet />, { initialState: INITIAL_STATE });

    const removeBtn = screen.getByRole('button', { name: 'excluir' });
    const expenseDescription = screen.getByText('banana');

    await userEvent.click(removeBtn);

    expect(store.getState()).toStrictEqual(EXPECTED_STATE);
    expect(expenseDescription).not.toBeInTheDocument();
  });

  test('2- verifica se ao editar uma despesa ela é alterada no estado e na tabela', async () => {
    const { store } = renderWithRouterAndRedux(<Wallet />, { initialState: INITIAL_STATE });

    const editBtn = screen.getByRole('button', { name: 'Editar' });

    await userEvent.click(editBtn);

    const descriptionInput = screen.getByTestId(DESCRIPTION_INPUT);

    await userEvent.clear(descriptionInput);
    await userEvent.type(descriptionInput, 'mango');

    const sendEditBtn = screen.getByRole('button', { name: 'Editar despesa' });

    await userEvent.click(sendEditBtn);

    expect(store.getState().wallet.expenses[0].description).toBe('mango');
  });
});
