import { useState, useEffect } from 'react';
import UserContext, { DrinksType, MealsType } from './UserContext';
import { getAllFoods, getAllDrinks } from '../Services/API';

type UserProviderProps = {
  children: React.ReactNode;
};

export default function UserProvider({ children }: UserProviderProps) {
  const [foodInfos, setFoodInfos] = useState<MealsType[]>([]);
  const [drinksInfos, setDrinksInfos] = useState<DrinksType[]>([]);

  useEffect(() => {
    async function buscaInfos() {
      const allfoos = await getAllFoods();
      const alldrinks = await getAllDrinks();

      setFoodInfos(allfoos);
      setDrinksInfos(alldrinks);
    }
    buscaInfos();
  }, []);

  return (
    <UserContext.Provider
      value={ { setFoodInfos, foodInfos, setDrinksInfos, drinksInfos } }
    >
      {children}
    </UserContext.Provider>
  );
}
