import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import UserContext, { DrinksType, MealsType } from './UserContext';
import fetchRecipesApi from '../Services/API';

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
