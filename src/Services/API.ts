export default async function fetchRecipesApi(
  typeOfFood: string,
  typeOfSearch: string,
  searchedWord: string,
  pathName: string,
) {
  const API_URL = `https://www.${typeOfFood}.com/api/json/v1/1/${typeOfSearch}=${searchedWord}`;
  const response = await fetch(API_URL);
  const data = await response.json();
  const result = await data;

  if (pathName === '/meals' && result.meals === null) {
    window.alert("Sorry, we haven't found any recipes for these filters.");
    return [];
  }
  if (pathName === '/drinks' && result.drinks === null) {
    window.alert("Sorry, we haven't found any recipes for these filters.");
    return [];
  }
  if (pathName === '/meals') {
    return data.meals;
  }
  if (pathName === '/drinks') {
    return data.drinks;
  }
}

export async function getAllFoods() {
  const foods = fetchRecipesApi('themealdb', 'search.php?s', '', '/meals');
  return foods;
}

export async function getAllDrinks() {
  const drinks = fetchRecipesApi('thecocktaildb', 'search.php?s', '', '/drinks');
  return drinks;
}

export async function getFoodsCategories() {
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
  const data = await response.json();

  const chaves = (data.meals).map((comida: any) => {
    return comida.strCategory;
  });

  const primeiras5 = chaves.slice(0, 5);

  return primeiras5;
}

export async function getDrinksCategories() {
  const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
  const data = await response.json();

  const chaves = (data.drinks).map((bebida: any) => {
    return bebida.strCategory;
  });
  const primeiras5 = chaves.slice(0, 5);

  return primeiras5;
}

export async function ReceitasPorCategoria(
  typeOfFood: string,
  typeOfSearch: string,
  searchedWord: string,
) {
  const API_URL = `https://www.${typeOfFood}.com/api/json/v1/1/${typeOfSearch}=${searchedWord}`;
  const response = await fetch(API_URL);
  const data = await response.json();
  const result = await data;
  return result;
}
