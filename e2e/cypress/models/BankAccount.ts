import { Chance } from 'chance';

const chance = new Chance();

class BankAccount implements IBankAccount {
  bankName = chance.company();
  routingNumber = chance.string({ numeric: true, length: 9 });
  accountNumber = chance.string({ numeric: true, length: 9 });
}

export default BankAccount;
