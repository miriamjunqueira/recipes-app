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
  const witchPath = pathname.includes('meals');
  const path = witchPath ? 'themealdb' : 'thecocktaildb';

  useEffect(() => {
    const getAPIData = async () => {
      const getRecipeDetails = await fetchRecipesDetailsApi(path, id);
      if (pathname.includes('meals')) {
        setMealRecipeDetail(getRecipeDetails.meals);
      }
      if (pathname.includes('drinks')) {
        setDrinkRecipeDetail(getRecipeDetails.drinks);
      }
      // setLoading(false);
    };
    getAPIData();
  }, [id, path, pathname]);

  const mealRecipeIngredients = mealRecipeDetail.length > 0 && mealRecipeDetail !== null
    ? Object.entries(mealRecipeDetail[0])
    : [];
  const allMealIngredients = mealRecipeIngredients.filter((ing) => ing[0]
    .startsWith(('strIngredient')) && ing[1] !== null
      && ing[1] !== '').map((ingName) => ingName[1]);
  console.log(allMealIngredients);

  const mealRecipeMeasures = mealRecipeDetail.length > 0 && mealRecipeDetail !== null
    ? Object.entries(mealRecipeDetail[0])
    : [];
  const allMealMeasures = mealRecipeMeasures.filter((measure) => measure[0]
    .startsWith(('strMeasure')) && measure[1] !== null
      && measure[1] !== '').map((measureName) => measureName[1]);
  console.log(allMealMeasures);

  const drinkRecipeIngredients = drinkRecipeDetail.length > 0
  && drinkRecipeDetail !== null
    ? Object.entries(drinkRecipeDetail[0])
    : [];
  const allDrinkIngredients = drinkRecipeIngredients.filter((ing) => ing[0]
    .startsWith(('strIngredient')) && ing[1] !== null
      && ing[1] !== '').map((ingName) => ingName[1]);
  const drinkRecipeMeasures = drinkRecipeDetail.length > 0 && drinkRecipeDetail !== null
    ? Object.entries(drinkRecipeDetail[0])
    : [];
  const allDrinkMeasures = drinkRecipeMeasures.filter((measure) => measure[0]
    .startsWith(('strMeasure')) && measure[1] !== null
      && measure[1] !== '').map((measureName) => measureName[1]);
  console.log(drinkRecipeDetail);
  console.log(mealRecipeDetail);
  // console.log(mealRecipeDetail[0].strYoutube);

  return (
    <div>
      {mealRecipeDetail.length === 0 && drinkRecipeDetail.length === 0 && <Loading />}
      {mealRecipeDetail.length !== 0 && (
        <div>
          <h2 data-testid="recipe-title">{mealRecipeDetail[0].strMeal}</h2>
          <h4 data-testid="recipe-category">{ mealRecipeDetail[0].strCategory }</h4>
          <img
            src={ mealRecipeDetail[0].strMealThumb }
            alt={ mealRecipeDetail[0].strMeal }
            width={ 80 }
            data-testid="recipe-photo"
          />
          <div>
            {allMealIngredients.map((ingValue, index) => (
              <div key={ index } data-testid={ `${index}-ingredient-name-and-measure` }>
                {ingValue}
                {' '}
                {' '}
                {allMealMeasures[index]}
                {' '}
              </div>
            ))}
          </div>
          <h5>Instructions</h5>
          <div data-testid="instructions">
            {mealRecipeDetail[0].strInstructions}
          </div>
          <div>
            <iframe
              data-testid="video"
              width="560"
              height="315"
              src={ `${mealRecipeDetail[0].strYoutube}`.replace('watch?v=', '/embed/') }
              title="Spicy penne Arrabiata"
              allowFullScreen
              allow="accelerometer; autoplay; clipboard-write;
                encrypted-media; gyroscope; picture-in-picture; web-share"
            />
          </div>
        </div>)}
      {drinkRecipeDetail.length !== 0 && (
        <div>
          <h2 data-testid="recipe-title">{drinkRecipeDetail[0].strDrink}</h2>
          <h4 data-testid="recipe-category">
            {`${drinkRecipeDetail[0].strCategory}
            - ${drinkRecipeDetail[0].strAlcoholic}`}

          </h4>
          <img
            src={ drinkRecipeDetail[0].strDrinkThumb }
            alt={ drinkRecipeDetail[0].strCategory }
            width={ 80 }
            data-testid="recipe-photo"
          />
          <div>
            {allDrinkIngredients.map((ingValue, index) => (
              <div key={ index } data-testid={ `${index}-ingredient-name-and-measure` }>
                {ingValue}
                {' '}
                {' '}
                {allDrinkMeasures[index]}
                {' '}
              </div>
            ))}
          </div>
          <div data-testid="instructions">
            {drinkRecipeDetail[0].strInstructions}
          </div>
        </div>)}
    </div>
  );
}
