import { cleanup, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import Wallet from '../pages/Wallet';
import { fetchCurrency } from '../redux/actions';
import user from '../redux/reducers/user';

const VALUE_INPUT = 'value-input';
const DESCRIPTION_INPUT = 'description-input';
const CURRENCY_INPUT = 'currency-input';
const METHOD_INPUT = 'method-input';
const TAG_INPUT = 'tag-input';

afterEach(cleanup);

test('1- Verifica se a tela poussui os inputs e botões esperados', () => {
  renderWithRouterAndRedux(<Wallet />);

  expect(screen.getByTestId(VALUE_INPUT)).toBeInTheDocument();
  expect(screen.getByTestId(DESCRIPTION_INPUT)).toBeInTheDocument();
  expect(screen.getByTestId(CURRENCY_INPUT)).toBeInTheDocument();
  expect(screen.getByTestId(METHOD_INPUT)).toBeInTheDocument();
  expect(screen.getByTestId(TAG_INPUT)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Adicionar despesa' })).toBeInTheDocument();
});

test('2- Verifica se a tela possui os headers esperados', () => {
  renderWithRouterAndRedux(<Wallet />);

  expect(screen.getByTestId('total-field')).toBeInTheDocument();
  expect(screen.getByTestId('email-field')).toBeInTheDocument();
  expect(screen.getByTestId('header-currency-field')).toBeInTheDocument();
});

test('3- Verifica se é possivel digitar informações nos inputs de texto', async () => {
  renderWithRouterAndRedux(<Wallet />);

  const valueInput = screen.getByTestId('value-input');
  const descriptionInput = screen.getByTestId('description-input');

  await userEvent.type(valueInput, '50');
  await userEvent.type(descriptionInput, 'bananas');

  expect(screen.getByTestId(VALUE_INPUT)).toHaveValue('50');
  expect(screen.getByTestId(DESCRIPTION_INPUT)).toHaveValue('bananas');
});
