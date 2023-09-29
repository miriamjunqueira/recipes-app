import React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

export default function DetailsButton() {
  const { pathname } = useLocation();
  const { id } = useParams();
  const navigate = useNavigate();

  const inProgressRecipesString = localStorage.getItem('inProgressRecipes');
  const getInProgressInfo = inProgressRecipesString
    ? JSON.parse(inProgressRecipesString) : {};
  console.log(inProgressRecipesString);
  const inProgressMeals = Object.keys(getInProgressInfo.meals || {})
    .includes(id as string);
  const inProgressDrinks = Object.keys(getInProgressInfo.drinks || {})
    .includes(id as string);
  console.log(inProgressDrinks);

  const isInProgress = inProgressDrinks || inProgressMeals
    ? 'Continue Recipe' : 'Start Recipe';

  const handleClick = (path: string) => {
    navigate(`${path}/in-progress`);
  };

  return (
    <button
      className="start-button"
      data-testid="start-recipe-btn"
      onClick={ () => handleClick(pathname) }
    >
      {isInProgress}
    </button>
  );
}
