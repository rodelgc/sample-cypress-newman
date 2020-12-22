import { Chance } from 'chance';

const chance = new Chance();

class User implements IUser {
  id = null;
  firstName = chance.first();
  lastName = chance.last();
  username = generateUsername(this.firstName, this.lastName);
  email = chance.email();
  phoneNumber = generatePhoneNumber();
  password = Cypress.env('GLOBAL_PASSWORD');
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
