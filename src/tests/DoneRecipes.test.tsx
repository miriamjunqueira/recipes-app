import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import { mockDoneRecipes } from './Mocks/MockDoneRecipes';

describe('Teste a página Done Recipes', () => {
  test('Testa a renderização dos botões de filtro', () => {
    renderWithRouter(<App />, { route: '/done-recipes' });
    const filterAll = screen.getByTestId('filter-by-all-btn');
    const filterMeals = screen.getByTestId('filter-by-meal-btn');
    const filterDrinks = screen.getByTestId('filter-by-drink-btn');

    expect(filterAll && filterMeals && filterDrinks).toBeInTheDocument();
  });
  test('Testa a funcionalidade dos botões de filtro', async () => {
    window.localStorage.setItem('doneRecipes', JSON.stringify(mockDoneRecipes));
    const { user } = renderWithRouter(<App />, { route: '/done-recipes' });
    const filterAll = screen.getByTestId('filter-by-all-btn');
    const filterMeals = screen.getByTestId('filter-by-meal-btn');
    const filterDrinks = screen.getByTestId('filter-by-drink-btn');
    const getMealCard = screen.getByTestId('0-horizontal-top-text');
    const getDrinkCard = screen.getByTestId('1-horizontal-top-text');
    expect(filterAll && filterMeals && filterDrinks).toBeInTheDocument();
    expect(getMealCard).toBeInTheDocument();
    expect(getDrinkCard).toBeInTheDocument();
    await user.click(filterMeals);
    expect(getMealCard).toBeInTheDocument();
    await user.click(filterDrinks);
    const alcoholic = screen.getByText(/alcoholic/i);
    expect(alcoholic).toBeInTheDocument();
    await user.click(filterAll);
  });
  test('Testa se ao clicar no nome redireciona para pagina de detalhes', async () => {
    window.localStorage.setItem('doneRecipes', JSON.stringify(mockDoneRecipes));
    const { user } = renderWithRouter(<App />, { route: '/done-recipes' });
    const getRecipeTitle = screen.getByTestId('0-horizontal-name');
    await user.click(getRecipeTitle);
    expect(window.location.pathname).toBe('/meals/52771');
  });
});
