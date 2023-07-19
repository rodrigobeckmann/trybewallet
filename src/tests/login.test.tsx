import { cleanup, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';

const LOGIN = 'user@email.com';
const PASSWORD = '123456';
const INVALID_LOGIN = 'useremail.com';

const EMAIL_TEST = 'email-input';
const PASSWORD_TEST = 'password-input';

afterEach(cleanup);

test('1- Verifica se ao iniciar a tela exibe um input para login e outro para senha', () => {
  renderWithRouterAndRedux(<App />);

  expect(screen.getByTestId(EMAIL_TEST)).toBeInTheDocument();
  expect(screen.getByTestId(PASSWORD_TEST)).toBeInTheDocument();
});

test('2- Verifica se ao iniciar a tela o botão entrar vem desabilitado por padrão', () => {
  renderWithRouterAndRedux(<App />);

  expect(screen.getByRole('button', { name: 'Entrar' })).toHaveProperty('disabled', true);
});

test('3- Verifica se ao incluir dados validos o botão de entrar fica habilitado', async () => {
  renderWithRouterAndRedux(<App />);

  const loginInput = screen.getByTestId(EMAIL_TEST);
  const passwordInput = screen.getByTestId(PASSWORD_TEST);

  await userEvent.type(loginInput, LOGIN);
  await userEvent.type(passwordInput, PASSWORD);

  expect(screen.getByRole('button', { name: 'Entrar' })).toHaveProperty('disabled', false);
});

test('4- Verifica se ao incluir dados invalidos o botão de entrar fica desabilitado', async () => {
  renderWithRouterAndRedux(<App />);

  const loginInput = screen.getByTestId(EMAIL_TEST);
  const passwordInput = screen.getByTestId(PASSWORD_TEST);

  await userEvent.type(loginInput, INVALID_LOGIN);
  await userEvent.type(passwordInput, PASSWORD);

  expect(screen.getByRole('button', { name: 'Entrar' })).toHaveProperty('disabled', true);
});
