import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { fetchRecipesDetailsApi } from '../../Services/API';
import { DrinksType, MealsType, MixedType } from '../../Context/UserContext';
import Loading from '../../Components/Loading';
import './RecipeDetails.css';
import RecommendationCard from '../../Components/RecomendationCard/RecomendationCard';
import DetailsButton from './DetailsButton';
import FavoriteButton from './FavoriteButton';

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
        getIngredients(getRecipeDetails.meals);
        setLoading(false);
      }
      if (pathname.includes('drinks')) {
        setRecipeDetail(getRecipeDetails.drinks);
        getIngredients(getRecipeDetails.drinks);
        setLoading(false);
      }
    };
    getAPIData();
  }, [id, path, pathname]);
  const getIngredients = (recipeDetails: MixedType[]) => {
    const recipeValues = recipeDetails.length > 0 && recipeDetails !== null
      ? Object.entries(recipeDetails[0])
      : [];
    const ingredientsValues: string[] = recipeValues.filter((ing) => ing[0]
      .startsWith(('strIngredient')) && ing[1] !== null
        && ing[1] !== '').map((ingName) => ingName[1]);
    setIngredients(ingredientsValues);
    const measuresValues = recipeValues.filter((measure) => measure[0]
      .startsWith(('strMeasure')) && measure[1] !== null
      && measure[1] !== '').map((measureName) => measureName[1]);
    setMeasures(measuresValues);
  };
  const getDoneRecipesInfo = JSON
    .parse(localStorage.getItem('doneRecipes') || '[]');
  const isRecipeDone = getDoneRecipesInfo
    .some((recipe: any) => recipe.id === id);

  const handleShareButton = () => {
    navigator.clipboard.writeText(`http://localhost:3000${pathname}`)
      .then(() => {
        const messageElement = document.createElement('div');
        messageElement.innerHTML = 'Link copied!';
        document.body.appendChild(messageElement);
        setTimeout(() => {
          document.body.removeChild(messageElement);
        }, 2000);
      }).catch((err) => {
        console.error('Erro ao copiar o link: ', err);
      });
  };

  return (
    <div>
      {loading ? <Loading /> : (
        <div>
          <h2 data-testid="recipe-title">
            {witchPath ? (recipeDetail[0] as MealsType).strMeal
              : (recipeDetail[0] as DrinksType).strDrink}
          </h2>
          {witchPath ? (
            <h4 data-testid="recipe-category">{ recipeDetail[0].strCategory }</h4>
          ) : (
            <h4 data-testid="recipe-category">
              { `${recipeDetail[0].strCategory} 
              - ${(recipeDetail[0] as DrinksType).strAlcoholic}` }
            </h4>)}
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
              <div
                key={ index }
                id="ingredients"
                data-testid={ `${index}-ingredient-name-and-measure` }
              >
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
          <div>
            <button
              data-testid="share-btn"
              onClick={ handleShareButton }
            >
              <img src="../src/images/shareIcon.svg" alt="Botão de compartilhar" />
            </button>
            <FavoriteButton recipeDetail={ recipeDetail[0] } />
            <RecommendationCard />
          </div>
          {!isRecipeDone && (
            <div>
              <DetailsButton />
            </div>
          )}
        </div>)}
    </div>
  );
}
