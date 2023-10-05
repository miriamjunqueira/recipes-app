import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ShareButton from '../../Components/Buttons/ShareButton';
import blackHeart from '../../images/blackHeartIcon.svg';

// Modelo de localstorage
// [{
//   id: id-da-receita,
//   type: meal-ou-drink,
//   nationality: nacionalidade-da-receita-ou-texto-vazio,
//   category: categoria-da-receita-ou-texto-vazio,
//   alcoholicOrNot: alcoholic-ou-non-alcoholic-ou-texto-vazio,
//   name: nome-da-receita,
//   image: imagem-da-receita
// }]

type FavoriteRecipeType = {
  id: string,
  type: 'meal' | 'drink',
  nationality: string,
  category: string,
  alcoholicOrNot: string,
  name: string,
  image: string,
};
type LocalStorageFavoriteType = FavoriteRecipeType[];

export default function FavoriteRecipes() {
  const [favoriteRecipes, setFavoriteRecipes] = useState<LocalStorageFavoriteType>([]);
  const [filters, setFilters] = useState('All');
  useEffect(() => {
    const savedFavoriteRecipesJSON = localStorage.getItem('favoriteRecipes') ?? '[]';
    const savedFavoriteRecipes = JSON.parse(savedFavoriteRecipesJSON);
    // Verifica se o estado atual é diferente das receitas salvas
    if (JSON.stringify(savedFavoriteRecipes) !== JSON.stringify(favoriteRecipes)) {
      setFavoriteRecipes(savedFavoriteRecipes);
    }
  }, [favoriteRecipes]);
  // Faço o filtro para os botoes e caso clique no all volta para tudo
  const typeOfFilter = filters === 'All' ? favoriteRecipes
    : favoriteRecipes.filter((recipe) => recipe.type === filters);

  const handleFavoriteBtnClick = (id: string) => {
    const removeFromFavLS = favoriteRecipes
      .filter((recipe: Record<string, string>) => recipe.id !== id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(removeFromFavLS));
    setFavoriteRecipes(removeFromFavLS);
  };

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
          <div key={ index } id="card">
            {recipe.type === 'meal' ? (
              <div>
                <Link to={ `/${recipe.type}s/${recipe.id}` }>
                  <h3 data-testid={ `${index}-horizontal-name` }>
                    {recipe.name}
                  </h3>
                </Link>
                <h5 data-testid={ `${index}-horizontal-top-text` }>
                  {`${recipe.nationality} - ${recipe.category}`}
                </h5>
              </div>
            ) : (
              <div>
                <Link to={ `/${recipe.type}s/${recipe.id}` }>
                  <h3 data-testid={ `${index}-horizontal-name` }>
                    {recipe.name}
                  </h3>
                </Link>
                <h5 data-testid={ `${index}-horizontal-top-text` }>
                  {`${recipe.nationality} - 
                ${recipe.category} - ${recipe.alcoholicOrNot}`}
                </h5>
              </div>
            )}
            <Link to={ `/${recipe.type}s/${recipe.id}` }>
              <img
                data-testid={ `${index}-horizontal-image` }
                src={ recipe.image }
                alt={ recipe.name }
                width={ 80 }
              />
            </Link>
            <ShareButton
              pathname={ `/${recipe.type}s/${recipe.id}` }
              testId={ `${index}-horizontal-share-btn` }
            />
            <button onClick={ () => handleFavoriteBtnClick(recipe.id) }>
              <img
                data-testid={ `${index}-horizontal-favorite-btn` }
                src={ blackHeart }
                alt="Botão favorito"
              />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
