import { screen, waitFor } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Teste a página de receitas', () => {
  test('Testa a renderização do Recipes Meals', async () => {
    renderWithRouter(<App />, { route: '/meals' });
    const beefButton = await screen.findByTestId('Beef-category-filter');
    const breakfastButton = await screen.findByTestId('Breakfast-category-filter');
    const chickenButton = await screen.findByTestId('Chicken-category-filter');
    const dessertButton = await screen.findByTestId('Dessert-category-filter');
    const goatButton = await screen.findByTestId('Goat-category-filter');
    const allButton = await screen.findByTestId('All-category-filter');
    expect(beefButton && breakfastButton && chickenButton && dessertButton && goatButton && allButton).toBeInTheDocument();
  });
  test('Testa a renderização do Recipes Drinks', async () => {
    renderWithRouter(<App />, { route: '/drinks' });
    const ordinaryButton = await screen.findByTestId('Ordinary Drink-category-filter');
    const cocktailButton = await screen.findByTestId('Cocktail-category-filter');
    const shakeButton = await screen.findByTestId('Shake-category-filter');
    const otherButton = await screen.findByTestId('Other / Unknown-category-filter');
    const cocoaButton = await screen.findByTestId('Cocoa-category-filter');
    const allButton = await screen.findByTestId('All-category-filter');
    expect(ordinaryButton && cocktailButton && shakeButton && otherButton && cocoaButton && allButton).toBeInTheDocument();
  });
  test('Testa a renderização do Recipes Meals', async () => {
    // Precisa de MOCK, passa mas as vezes nao mesma coisa para os outros
    const { user } = renderWithRouter(<App />, { route: '/meals' });
    const goatButton = await screen.findByTestId('Goat-category-filter');
    await user.click(goatButton);
    waitFor(async () => {
      const foodCard = await screen.findByTestId('1-card-name');
      expect(foodCard).toBeInTheDocument();
    });
  });
  test('Testa a renderização do Recipes Meals ao clicar no card', async () => {
    // Precisa de MOCK, passa mas as vezes nao mesma coisa para os outros
    const { user } = renderWithRouter(<App />, { route: '/meals' });
    const dessertButton = await screen.findByTestId('Dessert-category-filter');
    await user.click(dessertButton);
    waitFor(async () => {
      const foodCard = await screen.findByTestId('1-card-name');
      expect(foodCard).toBeInTheDocument();
    });
  });
  test('Testa se ao buscar encontra apenas 1 receita é redirecionado para tela da receita', async () => {
    // Precisa de MOCK, passa mas as vezes nao mesma coisa para os outros
    const { user } = renderWithRouter(<App />, { route: '/meals' });
    const getSearchButton = screen.getByTestId('search-top-btn');
    await user.click(getSearchButton);
    const getTextInput = screen.getByTestId('search-input');
    await user.type(getTextInput, 'Salmon Prawn Risotto');
    const getNameFilter = screen.getByTestId('name-search-radio');
    await user.click(getNameFilter);
    const getFilterButton = screen.getByTestId('exec-search-btn');
    await user.click(getFilterButton);
    const getRecipeTitle = await screen.findByTestId('recipe-title');
    expect(window.location.pathname).toBe('/meals/52823');
    expect(getRecipeTitle).toBeInTheDocument();
  });
  test('Testa se ao buscar encontra apenas 1 receita é redirecionado para tela da receita drinks', async () => {
    // Precisa de MOCK, passa mas as vezes nao mesma coisa para os outros
    const { user } = renderWithRouter(<App />, { route: '/drinks' });
    const getSearchButton = screen.getByTestId('search-top-btn');
    await user.click(getSearchButton);
    const getTextInput = screen.getByTestId('search-input');
    await user.type(getTextInput, 'Castillian Hot Chocolate');
    const getNameFilter = screen.getByTestId('name-search-radio');
    await user.click(getNameFilter);
    const getFilterButton = screen.getByTestId('exec-search-btn');
    await user.click(getFilterButton);
    await waitFor(async () => {
      const getRecipeTitle = await screen.findByTestId('recipe-title');
      expect(window.location.pathname).toBe('/drinks/12730');
      expect(getRecipeTitle).toBeInTheDocument();
    });
  });
  test('Testa a renderização do Recipes Drinks ao clicar no card', async () => {
    // Precisa de MOCK, passa mas as vezes nao mesma coisa para os outros
    const { user } = renderWithRouter(<App />, { route: '/drinks' });
    const dessertButton = await screen.findByTestId('Shake-category-filter');
    await user.click(dessertButton);
    const foodCard = await screen.findByTestId('0-card-name');
    expect(foodCard).toBeInTheDocument();
  });
  test('Testa a renderização do Recipes Drinks', async () => {
    // Precisa de MOCK, passa mas as vezes nao mesma coisa para os outros
    const { user } = renderWithRouter(<App />, { route: '/drinks' });
    await waitFor(async () => {
      const shakeButton = await screen.findByTestId('Shake-category-filter');
      await user.click(shakeButton);
      const foodCard = await screen.findByTestId('0-card-name');
      await user.click(foodCard);
      const getRecipeCategory = await screen.findByTestId('recipe-category');
      expect(window.location.pathname).toBe('/drinks/14588');
      expect(getRecipeCategory).toBeInTheDocument();
    });
  });
});
