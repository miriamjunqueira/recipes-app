import { useState } from 'react';
import UserContext, { DrinksType, MealsType } from './UserContext';

type UserProviderProps = {
  children: React.ReactNode;
};

export default function UserProvider({ children }: UserProviderProps) {
  const [foodInfos, setFoodInfos] = useState<DrinksType[] | MealsType[]>([]);

  return (
    <UserContext.Provider value={ { setFoodInfos, foodInfos } }>
      {children}
    </UserContext.Provider>
  );
}
