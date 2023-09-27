import { createContext } from 'react';

export type MealsType = {
  idDrink?: string;
  idMeal: string;
  strMeal: string;
  strCategory: string;
  strMealThumb: string;
  strArea: string;
  strIngredient1: string;
  strIngredient2: string;
  strIngredient3: string;
  strIngredient4: string;
  strIngredient5: string;
  strIngredient6: string;
  strIngredient7: string;
  strIngredient8: string;
  strInstructions: string;
  strYoutube: string;
  strMeasure1: string;
  strMeasure2: string;
  strMeasure3: string;
  strMeasure4: string;
  strMeasure5: string;
  strMeasure6: string;
  strMeasure7: string;
  strMeasure8: string;
};

export type DrinksType = {
  idMeal?: string;
  idDrink: string;
  strDrink: string;
  strDrinkThumb: string;
};

type UserContextType = {
  setFoodInfos: (recipes: MealsType[] | DrinksType[]) => void
  foodInfos: MealsType[] | DrinksType[]
};

const UserContext = createContext({} as UserContextType);

export default UserContext;
