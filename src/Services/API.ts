export default async function fetchRecipesApi(
  typeOfFood: string,
  typeOfSearch: string,
  searchedWord: string,
  pathName: string,
) {
  const API_URL = `https://www.${typeOfFood}.com/api/json/v1/1/${typeOfSearch}=${searchedWord}`;
  const response = await fetch(API_URL);
  const data = await response.json();
  if (pathName === '/meals') {
    return data.meals;
  }
  if (pathName === '/drinks') {
    return data.drinks;
  }
}
