interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  phoneNumber: string;
  password: string;
}

interface IBankAccount {
  bankName: string;
  routingNumber: string;
  accountNumber: string;
}

interface SignUpReqBody {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  confirmPassword: string;
}

interface CreateBankAccountReqBody {
  userId: string;
  bankName: string;
  accountNumber: string;
  routingNumber: string;
}

interface LoginReqBody {
  username: string;
  password: string;
}
