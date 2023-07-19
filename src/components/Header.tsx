import { useSelector } from 'react-redux';
import { RootRedux } from '../types';

function Header() {
  const { email } = useSelector((state: RootRedux) => state.user);
  const { total } = useSelector((state: RootRedux) => state.wallet);

  return (
    <header>
      <h1 data-testid="email-field">
        Usuario:
        {email}
      </h1>
      <h2 data-testid="total-field">
        {total < 0.00 ? '0.00' : total.toFixed(2)}
      </h2>
      <h2 data-testid="header-currency-field">
        cambio utilizado: BRL
      </h2>
    </header>
  );
}

export default Header;
