import { createContext } from 'react';

export type MealsType = {
  idDrink?: string;
  idMeal: string;
  strMeal: string;
  strCategory: string;
  strMealThumb: string;
};

export type DrinksType = {
  idMeal?: string;
  idDrink: string;
  strDrink: string;
  strDrinkThumb: string;
};

type UserContextType = {
  setFoodInfos: (recipes: MealsType[]) => void
  foodInfos: MealsType[]
  setDrinksInfos: (recipes: DrinksType[]) => void
  drinksInfos: DrinksType[]
};

const UserContext = createContext({} as UserContextType);

export default UserContext;
