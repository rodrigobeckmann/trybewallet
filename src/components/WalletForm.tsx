import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { RootRedux, Dispatch } from '../types';
import {
  addExpense,
  updateExpenses,
  removeExpense,
  totalSum,
  exitEdit,
} from '../redux/actions';

const INITIAL_WALLET = {
  value: '',
  description: '',
  currency: 'USD',
  method: 'Dinheiro',
  tag: 'Alimentação',
};

function WalletForm() {
  const dispatch: Dispatch = useDispatch();

  const { currencies, expenses } = useSelector((state: RootRedux) => state.wallet);
  const { isEdit, expense, index } = useSelector((state: RootRedux) => state.walletEdit);

  const { value, currency, description, exchangeRates, id, tag, method } = expense;

  const [walletData, setWalletData] = useState(INITIAL_WALLET);

  const onHandleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(addExpense(walletData));
    setWalletData(INITIAL_WALLET);
  };

  const onHandleSubmitEdit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const oldData = expenses;
    const newData = { ...walletData, id, exchangeRates };
    dispatch(removeExpense(id, expenses));
    oldData.splice(index, 1);
    oldData.splice(index, 0, newData);
    const newValue = ((parseFloat(exchangeRates[walletData.currency].ask))
      * parseFloat(walletData.value));
    dispatch(updateExpenses(oldData));
    dispatch(totalSum(newValue));
    dispatch(exitEdit());
  };

  useEffect(() => {
    if (isEdit) { setWalletData({ ...expense }); }
  }, [isEdit]);

  return (
    <form
      action="submit"
      onSubmit={ (e) => (isEdit
        ? onHandleSubmitEdit(e) : onHandleSubmit(e)) }
    >

      <label htmlFor="value">
        valor:
        <input
          data-testid="value-input"
          type="text"
          id="value"
          value={ (walletData.value) }
          onChange={ ({ target }) => setWalletData({
            ...walletData,
            [target.id]: target.value,
          }) }
        />
      </label>

      <label htmlFor="description">
        descrição:
        <input
          data-testid="description-input"
          type="text"
          id="description"
          value={ walletData.description }
          onChange={ ({ target }) => setWalletData({
            ...walletData,
            [target.id]: target.value,
          }) }
        />
      </label>

      <label htmlFor="currency">
        Moeda
        <select
          name="currency"
          id="currency"
          data-testid="currency-input"
          value={ walletData.currency }
          onChange={ ({ target }) => setWalletData({
            ...walletData,
            [target.id]: target.value,
          }) }
        >
          {currencies && currencies
            .map((
              cur,
              i,
            ) => <option key={ i } value={ cur }>{cur}</option>)}
        </select>
      </label>

      <label htmlFor="method">
        Forma de pagamento:
        <select
          name="paymentMethod"
          id="method"
          data-testid="method-input"
          value={ walletData.method }
          onChange={ ({ target }) => setWalletData({
            ...walletData,
            [target.id]: target.value,
          }) }
        >
          <option value="Dinheiro">Dinheiro</option>
          <option value="Cartão de crédito">Cartão de crédito</option>
          <option value="Cartão de débito">Cartão de débito</option>
        </select>
      </label>

      <label htmlFor="tag">
        Tipo de despesa:
        <select
          name="tag"
          id="tag"
          data-testid="tag-input"
          value={ walletData.tag }
          onChange={ ({ target }) => setWalletData({
            ...walletData,
            [target.id]: target.value,
          }) }
        >
          <option value="Alimentação">Alimentação</option>
          <option value="Lazer">Lazer</option>
          <option value="Trabalho">Trabalho</option>
          <option value="Transporte">Transporte</option>
          <option value="Saúde">Saúde</option>
        </select>
      </label>

      {isEdit ? <button>Editar despesa</button> : <button>Adicionar despesa</button>}

    </form>
  );
}

export default WalletForm;
