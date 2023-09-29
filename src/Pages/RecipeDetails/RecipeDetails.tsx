import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import fetchRecipesDetailsApi from '../../Services/RecipeDetailsAPI';
import { DrinksType, MealsType, MixedType } from '../../Context/UserContext';
import Loading from '../../Components/Loading';
import './RecipeDetails.css';
import RecommendationCard from '../../Components/RecomendationCard/RecomendationCard';

export default function RecipeDetails() {
  const [loading, setLoading] = useState(true);
  const [recipeDetail, setRecipeDetail] = useState<MixedType[]>([]);
  const [ingredients, setIngredients] = useState(['']);
  const [measures, setMeasures] = useState(['']);
  const { pathname } = useLocation();
  const { id } = useParams();
  const witchPath = pathname.includes('meals');

  const path = witchPath ? 'themealdb' : 'thecocktaildb';

  useEffect(() => {
    const getAPIData = async () => {
      const getRecipeDetails: { meals: MealsType[],
        drinks: DrinksType[] } = await fetchRecipesDetailsApi(path, id);
      if (pathname.includes('meals')) {
        setRecipeDetail(getRecipeDetails.meals);
        getIngredients(recipeDetail);
        getMeasures(recipeDetail);
        setLoading(false);
      }
      if (pathname.includes('drinks')) {
        setRecipeDetail(getRecipeDetails.drinks);
        getMeasures(recipeDetail);
        getIngredients(recipeDetail);
        setLoading(false);
      }
    };
    getAPIData();
  }, [id, path, pathname, recipeDetail]);

  // Tipagem com any apenas para testar
  const getIngredients = (recipeDetails: MixedType[]) => {
    const recipeValues = recipeDetails.length > 0 && recipeDetails !== null
      ? Object.entries(recipeDetails[0])
      : [];
    const ingredientsValues: string[] = recipeValues.filter((ing) => ing[0]
      .startsWith(('strIngredient')) && ing[1] !== null
        && ing[1] !== '').map((ingName) => ingName[1]);
    setIngredients(ingredientsValues);
  };
  const getMeasures = (recipeDetails: MixedType[]) => {
    const recipeValues = recipeDetails.length > 0 && recipeDetails !== null
      ? Object.entries(recipeDetails[0])
      : [];
    const measuresValues = recipeValues.filter((measure) => measure[0]
      .startsWith(('strMeasure')) && measure[1] !== null
      && measure[1] !== '').map((measureName) => measureName[1]);
    setMeasures(measuresValues);
  };

  // const getLocalStorageDoneRecipesInfo = JSON
  //   .parse(localStorage.getItem('doneRecipes') || '[]');
  // // Tipo é any até implementar a tipagem do LocalStorage
  // const isRecipeDone = getLocalStorageDoneRecipesInfo
  //   .some((recipe: any) => recipe.id === recipeDetail[0].idMeal
  // || recipe.id === recipeDetail[0].idDrink);

  return (
    <div>
      {loading ? <Loading /> : (
        <div>
          <h2 data-testid="recipe-title">
            {witchPath ? (recipeDetail[0] as MealsType).strMeal
              : (recipeDetail[0] as DrinksType).strDrink }
          </h2>
          <h4 data-testid="recipe-category">{ recipeDetail[0].strCategory }</h4>
          <img
            src={ witchPath ? (recipeDetail[0] as MealsType).strMealThumb
              : (recipeDetail[0] as DrinksType).strDrinkThumb }
            alt={ witchPath ? (recipeDetail[0] as MealsType).strMeal
              : (recipeDetail[0] as DrinksType).strDrink }
            width={ 80 }
            data-testid="recipe-photo"
          />
          <div>
            {ingredients.map((ingValue, index) => (
              <div key={ index } data-testid={ `${index}-ingredient-name-and-measure` }>
                {ingValue}
                {' '}
                {' '}
                {measures[index]}
                {' '}
              </div>
            ))}
          </div>
          <h5>Instructions</h5>
          <div data-testid="instructions">
            {recipeDetail[0].strInstructions}
          </div>
          {witchPath && (
            <div>
              <iframe
                data-testid="video"
                width="560"
                height="315"
                src={ `${(recipeDetail[0] as MealsType).strYoutube}`
                  .replace('watch?v=', '/embed/') }
                title={ (recipeDetail[0] as MealsType).strMeal }
                allowFullScreen
                allow="accelerometer; autoplay; clipboard-write;
                encrypted-media; gyroscope; picture-in-picture; web-share"
              />
            </div>)}
        </div>)}
      <div>
        <RecommendationCard />
      </div>
    </div>
  );
}
