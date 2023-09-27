import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import fetchRecipesDetailsApi from '../../Services/RecipeDetailsAPI';
import { DrinksType, MealsType } from '../../Context/UserContext';
import Loading from '../../Components/Loading';

// const path = pathname === 'meals' ? 'themealdb' : 'thecokctaildb';
// const param = useParams();
// const recipeId = param; // Recuperar o id-da-receita do useparam
// const { strMealThumb, strMeal, strCategory } = recipeDetail as MealsType;
// const ingredient = Object.entries(recipeDetail).filter((ingredients) => {
//   ingredients.startsWith('strIngredient');
// });
// console.log(Object.entries(recipeDetail))
// https://www.themealdb.com/api/json/v1/1/lookup.php?i=52772 link para testar API

export default function RecipeDetails() {
  // const [loading, setLoading] = useState(true);
  const [mealRecipeDetail, setMealRecipeDetail] = useState<MealsType[]>([]);
  const [drinkRecipeDetail, setDrinkRecipeDetail] = useState<DrinksType[]>([]);
  const { pathname } = useLocation();
  const { id } = useParams();
  console.log(pathname.includes('meals'));
  console.log(id);
  const path = pathname.includes('meals') ? 'themealdb' : 'thecocktaildb';

  useEffect(() => {
    const getAPIData = async () => {
      const getRecipeDetails = await fetchRecipesDetailsApi(path, id);
      if (pathname.includes('meals')) {
        setMealRecipeDetail(getRecipeDetails.meals);
      } else {
        setDrinkRecipeDetail(getRecipeDetails.drinks);
      }
      // setLoading(false);
    };
    getAPIData();
  }, [id, path, pathname]);

  console.log(mealRecipeDetail);
  console.log(drinkRecipeDetail);

  return (
    <div>
      Teste
    </div>
  );
}
