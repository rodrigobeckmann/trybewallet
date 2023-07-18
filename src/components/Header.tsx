import { useSelector } from 'react-redux';
import { RootRedux } from '../types';

function Header() {
  const { email } = useSelector((state: RootRedux) => state.user);
  const { total, currency } = useSelector((state: RootRedux) => state.wallet);

  return (
    <header>
      <h1 data-testid="email-field">
        Usuario:
        {email}
      </h1>
      <h2 data-testid="total-field">
        Depesa total:
        {total}
      </h2>
      <h2 data-testid="header-currency-field">
        cambio utilizado:
        {currency}
      </h2>
    </header>
  );
}

export default Header;
