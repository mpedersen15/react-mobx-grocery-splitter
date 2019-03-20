import React from 'react';
import ReactDOM from 'react-dom';
import { observer, PropTypes } from 'mobx-react';

import AppState from './state';

const store = new AppState();

store.addTransaction(15, 1);
store.addTransaction(10, 2);
store.addTransaction(10, 2);

window.store = store;

@observer
class Welcome extends React.Component {
  addTransaction = () => {
    console.log(this.refs);
    const parsedAmount = parseInt(this.refs['transaction-amount'].value, 10);
    console.log(parsedAmount);
    if (!isNaN(parsedAmount)) {
      this.props.state.addTransaction(
        parsedAmount,
        parseInt(this.refs['transaction-owner'].value, 10)
      );
    } else {
      console.log('Amount could not be parsed');
    }
  };

  render() {
    const { leader, difference, transactions } = this.props.state;
    return (
      <div>
        <ul>
          {transactions.map(t => (
            <li key={t.id}>
              ${t.amount} - {t.owner}
            </li>
          ))}
        </ul>
        <p>
          Person {leader} has spent ${difference} more on groceries.
        </p>

        <div>
          <input ref="transaction-amount" placeholder="Ex. 15" />
          <select ref="transaction-owner">
            <option value="1">Person 1</option>
            <option value="2">Person 2</option>
          </select>
          <button onClick={this.addTransaction}>Add Transaction</button>
        </div>
      </div>
    );
  }
}

Welcome.propTypes = {
  state: PropTypes.objectOrObservableObject,
};

ReactDOM.render(<Welcome state={store} />, document.getElementById('app'));
