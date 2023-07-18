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
        {total}
      </h2>
      <h2 data-testid="header-currency-field">
        cambio utilizado: BRL
      </h2>
    </header>
  );
}

export default Header;
