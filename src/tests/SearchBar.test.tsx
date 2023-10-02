import { screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import App from '../App';
import renderWithRouter from '../renderWithRouter';
import * as APIModules from '../Services/API';
import { mockMealSearchByFirstLetter, mockMealSearchByIngredient, mockMealSearchByName } from './Mocks/MockData';

const filterButton = 'search-top-btn';
const searchInputText = 'search-input';
const searchButtonText = 'exec-search-btn';
const firstLetterButtonText = 'first-letter-search-radio';

describe('Testa o componente SearchBar', () => {
  test('Testa se a pesquisa usa os parâmetros corretos para busca por nome', async () => {
    vi.spyOn(APIModules, 'fetchRecipesApi').mockResolvedValue(mockMealSearchByName.meals);
    const { user } = renderWithRouter(<App />, { route: '/meals' });
    const getSearchButton = screen.getByTestId(filterButton);
    await user.click(getSearchButton);
    const getTextInput = screen.getByTestId(searchInputText);
    await user.type(getTextInput, 'Eggplant');
    const radioName = screen.getByTestId('name-search-radio');
    await user.click(radioName);
    const getFilterButton = screen.getByTestId(searchButtonText);
    await user.click(getFilterButton);
    const getFoodCard = screen.getByTestId('0-recipe-card');
    expect(getFoodCard).toBeInTheDocument();
  });
  test('Testa se a pesquisa por First Letter funciona corretamente', async () => {
    vi.spyOn(APIModules, 'fetchRecipesApi').mockResolvedValue(mockMealSearchByFirstLetter.meals);
    const { user } = renderWithRouter(<App />, { route: '/meals' });
    const getSearchButton = screen.getByTestId(filterButton);
    await user.click(getSearchButton);
    const getTextInput = screen.getByTestId(searchInputText);
    await user.type(getTextInput, 'a');
    const radioName = screen.getByTestId(firstLetterButtonText);
    await user.click(radioName);
    const getFilterButton = screen.getByTestId(searchButtonText);
    await user.click(getFilterButton);
    const getFoodCard = screen.getByTestId('1-recipe-card');
    expect(getFoodCard).toBeInTheDocument();
  });
  test('Testa se a pesquisa por First Letter ao digitar mais de uma letra retorna Alert', async () => {
    vi.spyOn(APIModules, 'fetchRecipesApi');
    const { user } = renderWithRouter(<App />, { route: '/meals' });
    const getSearchButton = screen.getByTestId(filterButton);
    await user.click(getSearchButton);
    const radioName = screen.getByTestId(firstLetterButtonText);
    await user.click(radioName);
    const getTextInput = screen.getByTestId(searchInputText);
    await user.type(getTextInput, 'aa');
    const getFilterButton = screen.getByTestId(searchButtonText);
    await user.click(getFilterButton);
    waitFor(() => {
      const alert = vi.spyOn(global, 'alert');
      expect(alert).toHaveBeenCalledWith('Your search must have only 1 (one) character');
    });
  });
  test('Testa se a pesquisa por Ingredient funciona corretamente', async () => {
    vi.spyOn(APIModules, 'fetchRecipesApi').mockResolvedValue(mockMealSearchByIngredient.meals);
    const { user } = renderWithRouter(<App />, { route: '/meals' });
    const getSearchButton = screen.getByTestId(filterButton);
    await user.click(getSearchButton);
    const getTextInput = screen.getByTestId(searchInputText);
    await user.type(getTextInput, 'Salmon');
    const radioName = screen.getByTestId('ingredient-search-radio');
    await user.click(radioName);
    const getFilterButton = screen.getByTestId(searchButtonText);
    await user.click(getFilterButton);
    const getFoodCard = screen.getByTestId('0-recipe-card');
    expect(getFoodCard).toBeInTheDocument();
  });
  test('Testa se a rota for drinks requisiçao é feita para Cocktaildb no search', async () => {
    vi.spyOn(APIModules, 'fetchRecipesApi');
    const { user } = renderWithRouter(<App />, { route: '/drinks' });
    const getSearchButton = screen.getByTestId(filterButton);
    await user.click(getSearchButton);
    const getTextInput = screen.getByTestId(searchInputText);
    await user.type(getTextInput, 'a');
    const radioName = screen.getByTestId(firstLetterButtonText);
    await user.click(radioName);
    const getFilterButton = screen.getByTestId(searchButtonText);
    await user.click(getFilterButton);
    expect(APIModules.fetchRecipesApi).toHaveBeenCalledWith('thecocktaildb', 'search.php?f', 'a', '/drinks');
  });
});
