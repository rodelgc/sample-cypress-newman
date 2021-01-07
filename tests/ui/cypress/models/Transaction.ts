import { Chance } from 'chance';

const chance = new Chance();

export class Transaction {
  id: string;
  amount: number;
  description: string;

  constructor() {
    this.amount = chance.integer({ min: 10000, max: 99999 });
    this.description = chance.sentence({ words: 3 });
  }
}
