import { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { DrinksType, MealsType, MixedType } from '../../Context/UserContext';
import { fetchRecipesDetailsApi } from '../../Services/API';
import FavoriteButton from '../RecipeDetails/FavoriteButton';

export default function RecipesInProgress() {
  const { pathname } = useLocation();

  const { id } = useParams();

  const [arrayDeIngredientes, setArrayDeIngredientes] = useState([]);
  const [arrayDeMedidas, setArrayDeMedidas] = useState([]);
  const [receita, setReceita] = useState<any>({});

  useEffect(() => {
    const getAPIData = async () => {
      const whichPath = pathname.includes('meals');
      const path = whichPath ? 'themealdb' : 'thecocktaildb';

      const getRecipeDetails: { meals: MealsType[],
        drinks: DrinksType[] } = await fetchRecipesDetailsApi(path, id);

      let recipe: any;
      if (pathname.includes('meals')) {
        [recipe] = getRecipeDetails.meals;
      }
      if (pathname.includes('drinks')) {
        [recipe] = getRecipeDetails.drinks;
      }

      setReceita(recipe);
      const chavesValores: any[] = Object.entries(recipe);

      const ingredients: any[] = chavesValores.filter((ingredient) => {
        return ingredient[0].startsWith('strIngredient')
        && ingredient[1] !== null && ingredient[1] !== '';
      });
      const ingredientsValues: string[] = ingredients.map((ingredient) => {
        return ingredient[1];
      });
      // console.log(ingredientsValues);
      setArrayDeIngredientes(ingredientsValues);

      const measures = chavesValores.filter((mesure) => {
        return mesure[0].startsWith('strMeasure')
        && mesure[1] !== null && mesure[1] !== '';
      });

      const mesuresValues = measures.map((mesure) => {
        return mesure[1];
      });
        // console.log(mesureValues);
      setArrayDeMedidas(mesuresValues);
    };
    getAPIData();
  }, []);

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
      <div>
        <h3>--- Recipe in progress ---</h3>

        <button
          data-testid="share-btn"
          onClick={ handleShareButton }
        >
          <img src="../src/images/shareIcon.svg" alt="Botão de compartilhar" />
        </button>
        <FavoriteButton recipeDetail={ receita[0] } />

      </div>

      {pathname.includes('/meals')
      && (
        <div>
          <h2
            data-testid="recipe-title"
          >
            {receita.strMeal}
          </h2>
          <h4
            data-testid="recipe-category"
          >
            { receita.strCategory }
          </h4>

          <img
            src={ receita.strMealThumb }
            alt={ receita.strMeal }
            width={ 80 }
            data-testid="recipe-photo"
          />

        </div>
      )}

      {pathname.includes('/drinks')
      && (
        <div>
          <h2
            data-testid="recipe-title"
          >
            {receita.strDrink}
          </h2>
          <h4
            data-testid="recipe-category"
          >
            { receita.strCategory }
            {' '}
            {receita.strAlcoholic}
          </h4>

          <img
            src={ receita.strDrinkThumb }
            alt={ receita.strDrink }
            width={ 80 }
            data-testid="recipe-photo"
          />

        </div>
      )}

      {arrayDeIngredientes.map((ingrediente, index) => (
        <div
          key={ index }
        >

          <ul className="list-group">
            <li className="list-group-item">
              <label
                data-testid={ `${index}-ingredient-step` }
              >
                <input
                  className="form-check-input me-1"
                  type="checkbox"
                  value=""
                  aria-label="..."
                  data-testid="ingredient-step"
                />
                {ingrediente}
                {' - '}
                {arrayDeMedidas[index]}
              </label>
            </li>
          </ul>
        </div>
      ))}

      <div data-testid="instructions">
        <h5>Method of preparation:</h5>
        {receita.strInstructions}
      </div>

      <div>
        <button
          type="submit"
          data-testid="finish-recipe-btn"
        >
          Finish recipe
        </button>
      </div>

    </div>
  );
}
