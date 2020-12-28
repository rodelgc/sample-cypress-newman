import { Chance } from 'chance';
import User from './User';

const chance = new Chance();

export class Transaction {
  id: string;
  amount: number;
  description: string;

  constructor(user: User) {
    this.amount = chance.integer({ min: 1, max: user.balance });
    this.description = chance.sentence({ words: 3 });
  }
}
