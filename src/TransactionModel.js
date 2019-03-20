import { uniqueId } from 'lodash';

export class Transaction {
  id = '';
  amount = 0;
  owner = -1;
  date = null;

  constructor(amount, owner) {
    this.amount = amount;
    this.owner = owner;
    this.id = uniqueId('transaction-');
    this.date = new Date();
  }
}
