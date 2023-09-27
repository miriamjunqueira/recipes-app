import React, { useEffect, useState } from 'react';
// import { useLocation, useParams } from 'react-router-dom';
import fetchRecipesDetailsApi from '../../Services/RecipeDetailsAPI';
import { MealsType } from '../../Context/UserContext';
import Loading from '../../Components/Loading';

// const { pathname } = useLocation();
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
  const [loading, setLoading] = useState(true);
  const [recipeDetail, setRecipeDetail] = useState<MealsType>();

  useEffect(() => {
    const getAPIData = async () => {
      const getRecipeDetails = await fetchRecipesDetailsApi('52772', 'themealdb');
      setRecipeDetail(getRecipeDetails.meals[0]);
      setLoading(false);
    };
    setTimeout(() => getAPIData(), 2000);
  }, []);

  // const { strMealThumb, strMeal, strCategory } = recipeDetail as MealsType;
  const ingredients = recipeDetail
  && Object.entries(recipeDetail).filter((ingredient) => (
    ingredient[0].startsWith('strIngredient')));
  console.log(ingredients);

  const measures = recipeDetail
  && Object.entries(recipeDetail).filter((measure) => (
    measure[0].startsWith('strMeasure')));
  console.log(measures);

  return (
    <div>
      {loading ? <Loading /> : (
        <>
          <div>
            <h2>{recipeDetail.strMeal}</h2>
            <h3>{recipeDetail.strCategory}</h3>
            <img src={ recipeDetail.strMealThumb } alt="" width={ 80 } />
          </div>
          {ingredients?.map((ing, index) => (
            <div key={ index }>
              <span>{`${ing[1]}`}</span>
              <span>{` ${measures[index][1]}`}</span>
            </div>
          ))}
          <div />
        </>
      )}
    </div>
  );
}
