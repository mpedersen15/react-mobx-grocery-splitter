import { observable, computed } from 'mobx';
import { Transaction } from './TransactionModel';

export default class AppState {
  @observable transactions = [];

  @computed
  get difference() {
    return Math.abs(this.person1Total - this.person2Total);
  }

  @computed
  get person1Total() {
    return this.transactions.reduce(
      (prev, curr) => (curr.owner === 1 ? prev + curr.amount : prev),
      0
    );
  }

  @computed
  get person2Total() {
    return this.transactions.reduce(
      (prev, curr) => (curr.owner === 2 ? prev + curr.amount : prev),
      0
    );
  }

  @computed
  get leader() {
    return this.person1Total > this.person2Total ? 1 : 2;
  }

  addTransaction(amount, owner) {
    this.transactions.push(new Transaction(amount, owner));
  }
}
