import { createContext } from 'react';

type UserContextType = {
  nome: string,
  email: string,
  password: string,
};

const UserContext = createContext({} as UserContextType);

export default UserContext;
