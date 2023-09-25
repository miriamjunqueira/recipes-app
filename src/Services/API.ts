export default async function fetchRecipesApi(
  typeOfFood: string,
  typeOfSearch: string,
  searchedWord: string,
) {
  const API_URL = `https://www.${typeOfFood}.com/api/json/v1/1/${typeOfSearch}=${searchedWord}`;
  const response = await fetch(API_URL);
  const data = await response.json();
  return data;
}
