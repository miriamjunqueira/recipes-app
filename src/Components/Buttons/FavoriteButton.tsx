import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { DrinksType, MealsType, MixedType } from '../../Context/UserContext';
import blackHeart from '../../images/blackHeartIcon.svg';
import whiteHeart from '../../images/whiteHeartIcon.svg';

type FavButtonProps = {
  recipeDetail: MixedType
  favoriteTestId: string
};

export default function FavoriteButton({ recipeDetail, favoriteTestId }: FavButtonProps) {
  const { id } = useParams();
  //   [{
  //     id: id-da-receita,
  //     type: meal-ou-drink,
  //     nationality: nacionalidade-da-receita-ou-texto-vazio,
  //     category: categoria-da-receita-ou-texto-vazio,
  //     alcoholicOrNot: alcoholic-ou-non-alcoholic-ou-texto-vazio,
  //     name: nome-da-receita,
  //     image: imagem-da-receita
  // }]
  // Busca os dados no LocalStorage, se nao possuir a chave retornar um array vazio
  const getFavoritesFromLS = JSON.parse(
    localStorage.getItem('favoriteRecipes') as string,
  ) || [];
  const isFavoriteOnLS = getFavoritesFromLS
    .some((recipe: Record<string, string>) => recipe.id === id);
  const [isFavorite, setIsFavorite] = useState(isFavoriteOnLS);

  const handleFavoriteRecipe = () => {
    const newFavRecipe = {
      id: (recipeDetail as DrinksType).idDrink || (recipeDetail as MealsType).idMeal,
      type: recipeDetail.idDrink ? 'drink' : 'meal',
      nationality: recipeDetail.strArea || '',
      category: recipeDetail.strCategory || '',
      alcoholicOrNot: (recipeDetail as DrinksType).strAlcoholic || '',
      name: (recipeDetail as MealsType).strMeal || (recipeDetail as DrinksType).strDrink,
      image: (recipeDetail as MealsType).strMealThumb
      || (recipeDetail as DrinksType).strDrinkThumb,
    };
    if (isFavorite) {
      // Caso a receita ja esteja salva no LS ela é removida
      const removeFromFavLS = getFavoritesFromLS
        .filter((recipe: Record<string, string>) => recipe.id !== id);
      localStorage.setItem('favoriteRecipes', JSON.stringify(removeFromFavLS));
      setIsFavorite(false);
    } else {
      localStorage.setItem(
        'favoriteRecipes',
        JSON.stringify([...getFavoritesFromLS, newFavRecipe]),
      );
      setIsFavorite(true);
    }
  };

  return (
    <button
      onClick={ handleFavoriteRecipe }
    >
      {isFavorite ? <img
        data-testid={ favoriteTestId }
        src={ blackHeart }
        alt="Favorito Preenchido"
      />
        : <img
            data-testid={ favoriteTestId }
            src={ whiteHeart }
            alt="Favorito Vazio"
        />}
    </button>
  );
}
