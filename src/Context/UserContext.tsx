import { createContext } from 'react';

type UserContextType = {
  recipesAPI: any[],
};

const UserContext = createContext({} as UserContextType);

export default UserContext;
