import { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { DrinksType, MealsType } from '../../Context/UserContext';
import { fetchRecipesDetailsApi } from '../../Services/API';
import FavoriteButton from '../../Components/Buttons/FavoriteButton';
import './RecipesInProgress.css';
import ShareButton from '../../Components/Buttons/ShareButton';

export default function RecipesInProgress() {
  const { pathname } = useLocation();
  const shareButtonTestID = 'share-btn';
  const { id } = useParams();

  const [arrayDeIngredientes, setArrayDeIngredientes] = useState<string[]>([]);
  const [arrayDeMedidas, setArrayDeMedidas] = useState<any[]>([]);
  const [receita, setReceita] = useState<any>({});
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const modifiedPathname = pathname.replace('/in-progress', '');

  useEffect(() => {
    const getAPIData = async () => {
      const whichPath = pathname.includes('meals');
      const path = whichPath ? 'themealdb' : 'thecocktaildb';

      const getRecipeDetails: { meals: MealsType[],
        drinks: DrinksType[] } = await fetchRecipesDetailsApi(path, id);
      let recipe: any;
      if (pathname.includes('meals')) {
        [recipe] = getRecipeDetails.meals;
      } else {
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
      // localStorage.setItem('inProgressRecipes', JSON.stringify(vetTemporario));

      // Atualiza conforme localStorage:
      const storedArray = localStorage.getItem('inProgressRecipes') ?? '[]';
      setSelectedIngredients(JSON.parse(storedArray));

      const measures = chavesValores.filter((mesure) => {
        return mesure[0].startsWith('strMeasure')
        && mesure[1] !== null && mesure[1] !== '';
      });

      const mesuresValues = measures.map((mesure) => {
        return mesure[1];
      });
      setArrayDeMedidas(mesuresValues);
    };
    getAPIData();
  }, []);

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

    // Salvando seleções no localStorage:
    localStorage.setItem('inProgressRecipes', JSON.stringify(novoSelectedIngredients));
  }

  return (
    <div>
      <div>
        <h3>--- Recipe in progress ---</h3>

        <ShareButton pathname={ modifiedPathname } testId={ shareButtonTestID } />
        <FavoriteButton recipeDetail={ receita } />

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
                  checked={ selectedIngredients[index] === 'sim' }
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
