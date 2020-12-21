import { Chance } from 'chance';

const chance = new Chance();

class User {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  phoneNumber: string;
  password: string;

  constructor() {
    this.firstName = chance.first();
    this.lastName = chance.last();
    this.username = generateUsername(this.firstName, this.lastName);
    this.email = chance.email();
    this.phoneNumber = generatePhoneNumber();
    this.password = Cypress.env('GLOBAL_PASSWORD');
  }
}

function generateUsername(firstName: string, lastName: string): string {
  const formattedFirst = firstName.replace(/\W/g, '');
  const formattedLast = lastName.replace(/\W/g, '');

  return `${formattedFirst}_${formattedLast}`;
}

function generatePhoneNumber(): string {
  const phone1 = chance.string({ numeric: true, length: 3 });
  const phone2 = chance.string({ numeric: true, length: 3 });
  const phone3 = chance.string({ numeric: true, length: 4 });

  return `${phone1}-${phone2}-${phone3}`;
}

export default User;
