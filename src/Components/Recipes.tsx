import React, { useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import UserContext, { DrinksType, MealsType } from '../Context/UserContext';

export default function Recipes() {
  const { foodInfos } = useContext(UserContext);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const recipesToDisplay = foodInfos.slice(0, 12);

  if (pathname === '/meals' && foodInfos.length === 1) {
    navigate(`${pathname}/${foodInfos[0].idMeal}`);
  }
  if (pathname === '/drinks' && foodInfos.length === 1) {
    navigate(`${pathname}/${foodInfos[0].idDrink}`);
  }
  if (foodInfos.length !== null) {
    return (
      <div>
        {pathname === '/meals'
        && (recipesToDisplay as MealsType[]).map((recipe, index) => (
          <div data-testid={ `${index}-recipe-card` } key={ recipe.idMeal }>
            <h3 data-testid={ `${index}-card-name` }>{recipe.strMeal}</h3>
            <img
              data-testid={ `${index}-card-img` }
              src={ recipe.strMealThumb }
              alt={ `foto sobre ${recipe.strMeal}` }
              width={ 100 }
            />
          </div>
        ))}
        {pathname === '/drinks'
        && (recipesToDisplay as DrinksType[]).map((recipe, index) => (
          <div data-testid={ `${index}-recipe-card` } key={ recipe.idDrink }>
            <h3 data-testid={ `${index}-card-name` }>{recipe.strDrink}</h3>
            <img
              data-testid={ `${index}-card-img` }
              src={ recipe.strDrinkThumb }
              alt={ `foto sobre ${recipe.strDrink}` }
              width={ 100 }
            />
          </div>
        ))}
      </div>
    );
  }
}
