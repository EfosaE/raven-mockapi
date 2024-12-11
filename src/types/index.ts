export type User = {
  first_name: string;
  last_name: string;
  phone: string;
  amount: string; // raven used a type string from some strange reason
  email: string;
};

export type UserPayload = {
  id: string;
  username: string;
};


export type AccountResponse = {
  status: string;
  message: string;
  data: {
    account_number: string;
    account_name: string;
    bank: string;
    customer: {
      email: string;
      first_name: string;
      last_name: string;
      phone: string;
    };
    isPermanent: boolean;
    amount: string;
  };
};
