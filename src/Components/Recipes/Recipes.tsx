import React, { useContext, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import UserContext, { DrinksType, MealsType } from '../../Context/UserContext';
import Categories from '../Categories';

export default function Recipes() {
  const { foodInfos, drinksInfos } = useContext(UserContext);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  let recipesToDisplay: MealsType[] | DrinksType[] = [];
  if (pathname === '/meals') {
    recipesToDisplay = foodInfos.slice(0, 12);
  } else if (pathname === '/drinks') {
    recipesToDisplay = drinksInfos.slice(0, 12);
  }

  if (pathname === '/meals' && foodInfos.length === 1) {
    navigate(`${pathname}/${foodInfos[0].idMeal}`);
  }
  if (pathname === '/drinks' && drinksInfos.length === 1) {
    navigate(`${pathname}/${foodInfos[0].idDrink}`);
  }
  if (foodInfos.length !== null) {
    return (
      <div>
        {pathname === '/meals'
              && (<Categories />)}
        {pathname === '/meals'
        && (recipesToDisplay as MealsType[]).map((recipe, index) => (
          <div data-testid={ `${index}-recipe-card` } key={ recipe.idMeal }>
            <h3 data-testid={ `${index}-card-name` }>{recipe.strMeal}</h3>
            <img
              data-testid={ `${index}-card-img` }
              src={ recipe.strMealThumb }
              alt={ `foto sobre ${recipe.strMeal}` }
              width={ 80 }
            />
          </div>
        ))}
        {pathname === '/drinks'
              && (<Categories />)}
        {pathname === '/drinks'
        && (recipesToDisplay as DrinksType[]).map((recipe, index) => (
          <div data-testid={ `${index}-recipe-card` } key={ recipe.idDrink }>
            <h3 data-testid={ `${index}-card-name` }>{recipe.strDrink}</h3>
            <img
              data-testid={ `${index}-card-img` }
              src={ recipe.strDrinkThumb }
              alt={ `foto sobre ${recipe.strDrink}` }
              width={ 80 }
            />
          </div>
        ))}
      </div>
    );
  }
}
