import { vi } from 'vitest';
import { findByText, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import * as APIModules from '../Services/API';
import { mockCocoaRecipes, mockDrinksCategories, mockGoatRecipes, mockMealsCategories, mockOneResultDrink, mockOneResultMeal } from './Mocks/MockData';
import { mockExibicaoPadrao } from './Mocks/MockExibi';

const firstCard = '0-card-name';
const goatCatName = 'Goat-category-filter';
const filterButton = 'search-top-btn';
const searchInputText = 'search-input';
const searchButtonText = 'exec-search-btn';
const allCategoryName = 'All-category-filter';

describe('Teste a página de receitas', () => {
  test('Testa a renderização das categorias Meals', async () => {
    vi.spyOn(APIModules, 'getFoodsCategories').mockResolvedValue(mockMealsCategories);
    renderWithRouter(<App />, { route: '/meals' });
    const beefButton = await screen.findByTestId('Beef-category-filter');
    const breakfastButton = await screen.findByTestId('Breakfast-category-filter');
    const chickenButton = await screen.findByTestId('Chicken-category-filter');
    const dessertButton = await screen.findByTestId('Dessert-category-filter');
    const goatButton = await screen.findByTestId(goatCatName);
    const allButton = await screen.findByTestId(allCategoryName);
    expect(beefButton && breakfastButton && chickenButton && dessertButton && goatButton && allButton).toBeInTheDocument();
  });
  test('Testa a renderização das categorias Recipes Drinks', async () => {
    vi.spyOn(APIModules, 'getDrinksCategories').mockResolvedValue(mockDrinksCategories);
    renderWithRouter(<App />, { route: '/drinks' });
    const ordinaryButton = await screen.findByTestId('Ordinary Drink-category-filter');
    const cocktailButton = await screen.findByTestId('Cocktail-category-filter');
    const shakeButton = await screen.findByTestId('Shake-category-filter');
    const otherButton = await screen.findByTestId('Other / Unknown-category-filter');
    const cocoaButton = await screen.findByTestId('Cocoa-category-filter');
    const allButton = await screen.findByTestId(allCategoryName);
    expect(ordinaryButton && cocktailButton && shakeButton && otherButton && cocoaButton && allButton).toBeInTheDocument();
  });
  test('Testa a renderização do Recipes Meals ao selecionar Goat como categoria', async () => {
    vi.spyOn(APIModules, 'getFoodsCategories').mockResolvedValue(mockMealsCategories);
    vi.spyOn(APIModules, 'ReceitasPorCategoria').mockResolvedValue(mockGoatRecipes);
    const { user } = renderWithRouter(<App />, { route: '/meals' });
    const goatButton = await screen.findByTestId(goatCatName);
    await user.click(goatButton);
    const foodCard = await screen.findByTestId(firstCard);
    expect(foodCard).toBeInTheDocument();
  });
  test('Testa a renderização do Recipes Drinks ao selecionar Goat como categoria', async () => {
    vi.spyOn(APIModules, 'getDrinksCategories').mockResolvedValue(mockDrinksCategories);
    vi.spyOn(APIModules, 'ReceitasPorCategoria').mockResolvedValue(mockCocoaRecipes);
    const { user } = renderWithRouter(<App />, { route: '/drinks' });
    const cocoaButton = await screen.findByTestId('Cocoa-category-filter');
    await user.click(cocoaButton);
    const foodCard = await screen.findByTestId('1-card-name');
    expect(foodCard).toBeInTheDocument();
  });
  test('Testa se ao buscar encontra apenas 1 receita é redirecionado para tela da receita drinks', async () => {
    vi.spyOn(APIModules, 'fetchRecipesApi').mockResolvedValue(mockOneResultDrink);
    const { user } = renderWithRouter(<App />, { route: '/drinks' });
    const getSearchButton = screen.getByTestId(filterButton);
    await user.click(getSearchButton);
    const getTextInput = screen.getByTestId(searchInputText);
    await user.type(getTextInput, 'Castillian Hot Chocolate');
    const getNameFilter = screen.getByTestId('name-search-radio');
    await user.click(getNameFilter);
    const getFilterButton = screen.getByTestId(searchButtonText);
    await user.click(getFilterButton);
    expect(window.location.pathname).toBe('/drinks/12730');
  });
  test('Testa se ao buscar encontra apenas 1 receita é redirecionado para tela da receita meals', async () => {
    vi.spyOn(APIModules, 'fetchRecipesApi').mockResolvedValue(mockOneResultMeal.meals);
    const { user } = renderWithRouter(<App />, { route: '/meals' });
    const getSearchButton = screen.getByTestId(filterButton);
    await user.click(getSearchButton);
    const getTextInput = screen.getByTestId(searchInputText);
    await user.type(getTextInput, 'Corba');
    const getNameFilter = screen.getByTestId('name-search-radio');
    await user.click(getNameFilter);
    const getFilterButton = screen.getByTestId(searchButtonText);
    await user.click(getFilterButton);
    const instructionsText = await screen.findByText(/Instructions/i);
    expect(instructionsText).toBeInTheDocument();
    expect(window.location.pathname).toBe('/meals/52977');
  });
  test('Testa se ao clicar no card redirecionado para tela da receita meals', async () => {
    vi.spyOn(APIModules, 'getFoodsCategories').mockResolvedValue(mockMealsCategories);
    vi.spyOn(APIModules, 'ReceitasPorCategoria').mockResolvedValue(mockGoatRecipes);
    const { user } = renderWithRouter(<App />, { route: '/meals' });
    const goatButton = await screen.findByTestId(goatCatName);
    await user.click(goatButton);
    const foodCard = await screen.findByTestId(firstCard);
    await user.click(foodCard);
    // expect(window.location.pathname).toBe('/meals/52968');
  });
  test('Testa a renderização do Recipes Meals ao selecionar All ao clicar novamente volta para a padrão', async () => {
    vi.spyOn(APIModules, 'getFoodsCategories').mockResolvedValue(mockMealsCategories);
    vi.spyOn(APIModules, 'fetchRecipesApi').mockResolvedValue(mockExibicaoPadrao.slice(0, 12));
    const { user } = renderWithRouter(<App />, { route: '/meals' });
    const goatButton = await screen.findByTestId(goatCatName);
    await user.click(goatButton);
    const allButton = await screen.findByTestId(allCategoryName);
    await user.click(allButton);
    const foodCard = await screen.findByTestId('0-recipe-card');
    expect(foodCard).toBeInTheDocument();
  });
});
