import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { submitLogin, fetchCurrency } from '../redux/actions';
import { Dispatch } from '../types';

const INITIAL_LOGIN = {
  email: '',
  password: '',
};

const EMAIL_REGEX = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

function Login() {
  const dispatch: Dispatch = useDispatch();
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState(INITIAL_LOGIN);
  const [isLoginValid, setIsLoginValid] = useState(true);

  useEffect(() => {
    const validateLogin = () => {
      if (EMAIL_REGEX.test(loginData.email) && loginData.password.length > 5) {
        setIsLoginValid(false);
      } else {
        setIsLoginValid(true);
      }
    };

    validateLogin();
  }, [loginData]);

  const onHandleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(submitLogin(loginData.email));
    dispatch(fetchCurrency());
    navigate('/carteira');
  };

  return (

    <form action="submit" onSubmit={ (e) => onHandleSubmit(e) }>

      <label htmlFor="email">
        email
        <input
          data-testid="email-input"
          type="email"
          id="email"
          value={ loginData.email }
          onChange={ ({ target }) => setLoginData({ ...loginData, email: target.value }) }
        />
      </label>

      <label htmlFor="password">
        password
        <input
          data-testid="password-input"
          type="password"
          id="password"
          value={ loginData.password }
          onChange={ ({ target }) => setLoginData({
            ...loginData,
            password: target.value,
          }) }
        />
      </label>

      <button disabled={ isLoginValid }>Entrar</button>

    </form>

  );
}

export default Login;
