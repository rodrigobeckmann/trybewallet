import { useSelector, useDispatch } from 'react-redux';
import { RootRedux, Dispatch } from '../types';
import { removeExpense } from '../redux/actions';

function Table() {
  const dispatch: Dispatch = useDispatch();

  const { expenses } = useSelector((state: RootRedux) => state.wallet);

  return (
    <table>
      <thead>
        <tr>
          <th>Descrição</th>
          <th>Tag</th>
          <th>Método de pagamento</th>
          <th>Valor</th>
          <th>Moeda</th>
          <th>Câmbio utilizado</th>
          <th>Valor convertido</th>
          <th>Moeda de conversão</th>
          <th>Editar/Excluir</th>
        </tr>
      </thead>
      <tbody>
        {expenses.map((expense: any) => {
          const convertedValue = parseFloat(expense.value)
            * parseFloat(expense.exchangeRates[expense.currency].ask);

          const exchange = (parseFloat(expense.exchangeRates[expense.currency].ask))
            .toFixed(2);

          return (
            <tr key={ expense.id }>
              <td>{expense.description}</td>
              <td>{expense.tag}</td>
              <td>{expense.method}</td>
              <td>{(parseFloat(expense.value)).toFixed(2)}</td>
              <td>{expense.exchangeRates[expense.currency].name}</td>
              <td>{exchange}</td>
              <td>{convertedValue.toFixed(2)}</td>
              <td>Real</td>
              <td>
                <button
                  data-testid="delete-btn"
                  onClick={ () => dispatch(removeExpense(expense.id, expenses)) }
                >
                  excluir
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default Table;
