import { Chance } from 'chance';

const chance = new Chance();

class BankAccount {
  bankName: string;
  routingNumber: string;
  accountNumber: string;

  constructor() {
    this.bankName = chance.company();
    this.routingNumber = chance.string({ numeric: true, length: 9 });
    this.accountNumber = chance.string({ numeric: true, length: 9 });
  }
}

export default BankAccount;
