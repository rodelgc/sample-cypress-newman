import { Chance } from "chance";

const chance = new Chance();

class User {
  firstName = chance.first();
  lastName = chance.last();
  username = generateUsername(this.firstName, this.lastName);
  email = chance.email();
  phoneNumber = generatePhoneNumber();
  password = "T3st!";
}

function generateUsername(firstName, lastName) {
  const formattedFirst = firstName.replace(/\W/gi, "");
  const formattedLast = lastName.replace(/\W/gi, "");

  return `${formattedFirst}_${formattedLast}`;
}

function generatePhoneNumber() {
  const phone1 = chance.string({ numeric: true, length: 3 });
  const phone2 = chance.string({ numeric: true, length: 3 });
  const phone3 = chance.string({ numeric: true, length: 4 });

  return `${phone1}-${phone2}-${phone3}`;
}

export default User;
