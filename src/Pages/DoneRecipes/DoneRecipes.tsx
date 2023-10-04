import React, { useEffect, useState } from 'react';

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
  // const newRecipeDone = [{
  //   id: 'id - da - receita',
  //   type: 'meal - ou - drink',
  //   nationality: 'nacionalidade - da - receita - ou - texto - vazio',
  //   category: 'categoria - da - receita - ou - texto - vazio',
  //   alcoholicOrNot: 'alcoholic - ou - non - alcoholic - ou - texto - vazio',
  //   name: 'nome - da - receita',
  //   image: 'imagem - da - receita',
  //   doneDate: 'quando - a - receita - foi - concluida',
  //   tags: [],
  // }];
  // const newRecipeDoneJSON = JSON.stringify(newRecipeDone);
  // localStorage.setItem('doneRecipes', newRecipeDoneJSON);
  // [{  MODELO DO LOCALSTORAGE
  //     id: id-da-receita,
  //     type: meal-ou-drink,
  //     nationality: nacionalidade-da-receita-ou-texto-vazio,
  //     category: categoria-da-receita-ou-texto-vazio,
  //     alcoholicOrNot: alcoholic-ou-non-alcoholic-ou-texto-vazio,
  //     name: nome-da-receita,
  //     image: imagem-da-receita,
  //     doneDate: quando-a-receita-foi-concluida,
  //     tags: array-de-tags-da-receita-ou-array-vazio
  // }]
  const [doneRecipes, setDoneRecipes] = useState<LocalStorageDoneType>([]);
  useEffect(() => {
    const savedDoneRecipesJSON = localStorage.getItem('doneRecipes') ?? '[]';
    const savedDoneRecipes = JSON.parse(savedDoneRecipesJSON);
    setDoneRecipes(savedDoneRecipes);
  }, []);

  return (
    <div>
      <button data-testid="filter-by-all-btn">All</button>
      <button data-testid="filter-by-meal-btn">Meals</button>
      <button data-testid="filter-by-drink-btn">Drinks</button>
      <div>
        {doneRecipes.map((recipe, index) => (
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
            <button>
              <img
                src="../images/shareIcon.svg"
                alt="Botão de compartilhar a receita"
                data-testid={ `${index}-horizontal-share-btn` }
              />
            </button>
            {recipe.tags && recipe.tags.map((tag, i) => (
              <span
                data-testid={ `${index}-${tag}-horizontal-tag` }
                key={ i }
              >
                {tag}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
