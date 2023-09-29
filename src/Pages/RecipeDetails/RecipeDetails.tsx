import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import fetchRecipesDetailsApi from '../../Services/RecipeDetailsAPI';
import { DrinksType, MealsType } from '../../Context/UserContext';
import Loading from '../../Components/Loading';
import RecommendationCard from '../../Components/RecomendationCard/RecomendationCard';

export default function RecipeDetails() {
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
    };
    getAPIData();
  }, [id, path, pathname]);

  // Aqui eu separo os valores do objeto como [string, string]
  const mealRecipeValues = mealRecipeDetail.length > 0 && mealRecipeDetail !== null
    ? Object.entries(mealRecipeDetail[0])
    : [];

  // Aqui separo o que são os ingredientes
  const mealIngredients = mealRecipeValues.filter((ing) => ing[0]
    .startsWith(('strIngredient')) && ing[1] !== null
      && ing[1] !== '').map((ingName) => ingName[1]);
  // Aqui separo o que são as medidas
  const mealMeasures = mealRecipeValues.filter((measure) => measure[0]
    .startsWith(('strMeasure')) && measure[1] !== null
      && measure[1] !== '').map((measureName) => measureName[1]);
  // Aqui eu separo os valores do objeto como [string, string]
  const drinkRecipeValues = drinkRecipeDetail.length > 0
  && drinkRecipeDetail !== null
    ? Object.entries(drinkRecipeDetail[0])
    : [];
  // Aqui separo o que são os ingredientes
  const drinkIngredients = drinkRecipeValues.filter((ing) => ing[0]
    .startsWith(('strIngredient')) && ing[1] !== null
      && ing[1] !== '').map((ingName) => ingName[1]);
  // Aqui separo o que são as medidas
  const drinkMeasures = drinkRecipeValues.filter((measure) => measure[0]
    .startsWith(('strMeasure')) && measure[1] !== null
      && measure[1] !== '').map((measureName) => measureName[1]);

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
            {mealIngredients.map((ingValue, index) => (
              <div key={ index } data-testid={ `${index}-ingredient-name-and-measure` }>
                {ingValue}
                {' '}
                {' '}
                {mealMeasures[index]}
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
            {drinkIngredients.map((ingValue, index) => (
              <div key={ index } data-testid={ `${index}-ingredient-name-and-measure` }>
                {ingValue}
                {' '}
                {' '}
                {drinkMeasures[index]}
                {' '}
              </div>
            ))}
          </div>
          <div data-testid="instructions">
            {drinkRecipeDetail[0].strInstructions}
          </div>
        </div>)}
      <div>
        <RecommendationCard />
      </div>
    </div>
  );
}
