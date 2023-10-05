import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import { mockFavoriteRecipes } from './Mocks/MockFavoriteRecipes';

const rota = '/favorite-recipes';

describe('Teste a página Favorite Recipes', () => {
  test('Testa a renderização dos botões de filtro', () => {
    renderWithRouter(<App />, { route: rota });
    const filterAll = screen.getByTestId('filter-by-all-btn');
    const filterMeals = screen.getByTestId('filter-by-meal-btn');
    const filterDrinks = screen.getByTestId('filter-by-drink-btn');

    expect(filterAll && filterMeals && filterDrinks).toBeInTheDocument();
  });
  test('Testa a funcionalidade dos botões de filtro', async () => {
    window.localStorage.setItem('favoriteRecipes', JSON.stringify(mockFavoriteRecipes));
    const { user } = renderWithRouter(<App />, { route: rota });
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
    window.localStorage.setItem('favoriteRecipes', JSON.stringify(mockFavoriteRecipes));
    const { user } = renderWithRouter(<App />, { route: rota });
    const getRecipeTitle = screen.getByTestId('0-horizontal-name');
    await user.click(getRecipeTitle);
    expect(window.location.pathname).toBe('/meals/52771');
  });
  test('Testa se o botão de desfavoritar funciona corretamente', async () => {
    window.localStorage.setItem('favoriteRecipes', JSON.stringify(mockFavoriteRecipes));
    const { user } = renderWithRouter(<App />, { route: rota });
    const getCards = await screen.findAllByAltText('Botão favorito');
    expect(getCards).toHaveLength(2);
    const getFavoriteBtn = screen.getByTestId('0-horizontal-favorite-btn');
    await user.click(getFavoriteBtn);
    const getImage = await screen.findByTestId('0-horizontal-image');
    const cardRemove = await screen.findAllByAltText('Botão favorito');
    expect(getImage).toBeInTheDocument();
    expect(cardRemove).toHaveLength(1);
  });
});
