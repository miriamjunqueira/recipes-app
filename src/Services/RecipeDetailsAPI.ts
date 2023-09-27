export default async function fetchRecipesDetailsApi(
  path: string,
  recipeId?: string,
) {
  const API_URL = `https://www.${path}.com/api/json/v1/1/lookup.php?i=${recipeId}`;
  const response = await fetch(API_URL);
  const data = await response.json();
  const result = await data;

  return result;
}
