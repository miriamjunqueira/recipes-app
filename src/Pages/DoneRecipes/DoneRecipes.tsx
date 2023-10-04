import React, { useEffect, useState } from 'react';
import ShareButton from '../../Components/ShareButton';

type DoneRecipe = {
  id: string,
  type: 'meal' | 'drink',
  nationality: string,
  category: string,
  alcoholicOrNot: string,
  name: string,
  image: string,
  doneDate: string,
  tags: string[] | [],
};
type LocalStorageDoneType = DoneRecipe[];

export default function DoneRecipes() {
  const [doneRecipes, setDoneRecipes] = useState<LocalStorageDoneType>([]);
  const [filters, setFilters] = useState('All');
  useEffect(() => {
    const savedDoneRecipesJSON = localStorage.getItem('doneRecipes') ?? '[]';
    const savedDoneRecipes = JSON.parse(savedDoneRecipesJSON);
    setDoneRecipes(savedDoneRecipes);
  }, []);

  const typeOfFilter = filters === 'All' ? doneRecipes
    : doneRecipes.filter((recipe) => recipe.type === filters);

  return (
    <div>
      <button
        data-testid="filter-by-all-btn"
        onClick={ () => setFilters('All') }
      >
        All
      </button>
      <button
        data-testid="filter-by-meal-btn"
        onClick={ () => setFilters('meal') }
      >
        Meals
      </button>
      <button
        data-testid="filter-by-drink-btn"
        onClick={ () => setFilters('drink') }
      >
        Drinks
      </button>
      <div>
        {typeOfFilter.map((recipe, index) => (
          <div key={ index }>
            {recipe.type === 'meal' ? (
              <div>
                <h3 data-testid={ `${index}-horizontal-name` }>{recipe.name}</h3>
                <h5 data-testid={ `${index}-horizontal-top-text` }>
                  {`${recipe.nationality} - ${recipe.category}`}
                </h5>
              </div>
            ) : (
              <div>
                <h3 data-testid={ `${index}-horizontal-name` }>{recipe.name}</h3>
                <h5 data-testid={ `${index}-horizontal-top-text` }>
                  {`${recipe.nationality} - ${recipe.category}`}
                </h5>
              </div>
            )}
            <h3 data-testid={ `${index}-horizontal-name` }>{recipe.name}</h3>
            <h5 data-testid={ `${index}-horizontal-top-text` }>
              {`${recipe.nationality} - ${recipe.category} - ${recipe.alcoholicOrNot}`}
            </h5>
            <img
              data-testid={ `${index}-horizontal-image` }
              src={ recipe.image }
              alt={ recipe.name }
              width={ 80 }
            />
            <p data-testid={ `${index}-horizontal-done-date` }>{recipe.doneDate}</p>
            <ShareButton
              pathname={ `/${recipe.type}s/${recipe.id}` }
              testId={ `${index}-horizontal-share-btn` }
            />
            {recipe.tags && recipe.tags.map((tag, i) => (
              <div key={ i }>
                <span
                  data-testid={ `${index}-${tag}-horizontal-tag` }
                >
                  {tag}
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
