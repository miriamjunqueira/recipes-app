import React from 'react';

export default function SearchBar() {
  return (
    <div>
      <input
        type="text"
        data-testid="search-input"
        name="search"
        placeholder="Procure uma receita"
      />
      <label htmlFor="ingredient">
        Ingrediente
        <input
          type="radio"
          name="typeSearch"
          id="ingredient"
          data-testid="ingredient-search-radio"
        />
      </label>
      <label htmlFor="nameSearch">
        Nome
        <input
          type="radio"
          name="typeSearch"
          id="nameSearch"
          data-testid="name-search-radio"
        />
      </label>
      <label htmlFor="firstLetter">
        Primeira Letra
        <input
          type="radio"
          name="typeSearch"
          id="firstLetter"
          data-testid="first-letter-search-radio"
        />
      </label>
      <button data-testid="exec-search-btn">Pesquisa</button>
    </div>
  );
}
