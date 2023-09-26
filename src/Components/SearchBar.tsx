import React, { useContext, useState } from 'react';
import { useLocation } from 'react-router-dom';
import fetchRecipesApi from '../Services/API';
import UserContext from '../Context/UserContext';
import Recipes from './Recipes/Recipes';

export default function SearchBar() {
  const [radioButton, setRadioButtons] = useState('Name');
  const [searchedWord, setSearchedWord] = useState('');
  const location = useLocation();
  const { setFoodInfos, foodInfos } = useContext(UserContext);
  const { pathname } = location;
  const urlForApi = pathname === '/meals' ? 'themealdb' : 'thecocktaildb';
  console.log(foodInfos);

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRadioButtons(e.target.value);
  };
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchedWord(e.target.value);
  };

  const handleSubmitSearch = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (radioButton === 'First Letter' && searchedWord.length > 1) {
      window.alert('Your search must have only 1 (one) character');
    }
    if (radioButton === 'Name') {
      const nameData = await fetchRecipesApi(
        urlForApi,
        'search.php?s',
        searchedWord,
        pathname,
      );
      setFoodInfos(nameData);
    }
    if (radioButton === 'Ingredient') {
      const ingredientData = await
      fetchRecipesApi(urlForApi, 'filter.php?i', searchedWord, pathname);
      setFoodInfos(ingredientData);
    }
    if (radioButton === 'First Letter' && searchedWord.length === 1) {
      const firstLetterData = await
      fetchRecipesApi(urlForApi, 'search.php?f', searchedWord, pathname);
      setFoodInfos(firstLetterData);
    }
  };

  return (
    <div>
      <form onSubmit={ handleSubmitSearch }>
        <input
          type="text"
          data-testid="search-input"
          name="search"
          placeholder="Procure uma receita"
          onChange={ handleSearchChange }
        />
        <label htmlFor="ingredient">
          Ingredient
          <input
            type="radio"
            value="Ingredient"
            name="typeSearch"
            id="ingredient"
            data-testid="ingredient-search-radio"
            onChange={ handleRadioChange }
          />
        </label>
        <label htmlFor="nameSearch">
          Name
          <input
            type="radio"
            value="Name"
            name="typeSearch"
            id="nameSearch"
            data-testid="name-search-radio"
            onChange={ handleRadioChange }
          />
        </label>
        <label htmlFor="firstLetter">
          First letter
          <input
            type="radio"
            value="First Letter"
            name="typeSearch"
            id="firstLetter"
            data-testid="first-letter-search-radio"
            onChange={ handleRadioChange }
          />
        </label>
        <button data-testid="exec-search-btn">Pesquisa</button>
      </form>
      <Recipes />
    </div>
  );
}
