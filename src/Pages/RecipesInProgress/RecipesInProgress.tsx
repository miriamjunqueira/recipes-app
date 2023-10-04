import { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { DrinksType, MealsType, MixedType } from '../../Context/UserContext';
import { fetchRecipesDetailsApi } from '../../Services/API';
import FavoriteButton from '../RecipeDetails/FavoriteButton';
import './RecipesInProgress.css';

export default function RecipesInProgress() {
  const { pathname } = useLocation();

  const { id } = useParams();

  const [arrayDeIngredientes, setArrayDeIngredientes] = useState<string[]>([]);
  const [arrayDeMedidas, setArrayDeMedidas] = useState<any[]>([]);
  const [receita, setReceita] = useState<any>({});
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);

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
      setArrayDeIngredientes(ingredientsValues);

      // config de partida:
      const vetTemporario: string[] = [];
      ingredientsValues.forEach((ingredient, index) => {
        vetTemporario[index] = 'nao';
      });
      setSelectedIngredients(vetTemporario);

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

  function confereClick(event: any) {
    const checkbox = event.target.value;
    const clicou = event.target.checked;

    const novoSelectedIngredients = [...selectedIngredients];
    if (clicou) {
      novoSelectedIngredients[checkbox] = 'sim';
    } else {
      novoSelectedIngredients[checkbox] = 'nao';
    }
    setSelectedIngredients(novoSelectedIngredients);
  }

  // console.log(arrayDeIngredientes);

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

      <div>

        <ul className="list-group">
          {arrayDeIngredientes.map((ingrediente, index) => (
            <li
              className="list-group-item"
              key={ index }
            >
              <label
                data-testid={ `${index}-ingredient-step` }
                className={ `${selectedIngredients[index]}` }
              >
                <input
                  className="form-check-input me-1"
                  type="checkbox"
                  value={ index }
                  aria-label="..."
                  data-testid="ingredient-step"
                  id={ `${selectedIngredients[index]} form-check-input me-1` }
                  onClick={ confereClick }
                />
                {ingrediente}
                {' - '}
                {arrayDeMedidas[index]}
              </label>
            </li>
          ))}
        </ul>
      </div>

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
