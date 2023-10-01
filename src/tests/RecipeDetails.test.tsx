import { screen, waitFor, waitForElementToBeRemoved } from '@testing-library/dom';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Testa a pagina de Detalhes da Receita', () => {
  test('Testa elementos na tela rota Meals', async () => {
    renderWithRouter(<App />, { route: '/meals/52771' });
    const recipeTitle = await screen.findAllByTestId('recipe-title');
    expect(recipeTitle).toHaveLength(1);
    const recipeInstructions = await screen.findAllByTestId('instructions');
    expect(recipeInstructions).toHaveLength(1);
    const recipeCategory = await screen.findAllByTestId('recipe-category');
    expect(recipeCategory).toHaveLength(1);
    const recipePhoto = await screen.findAllByTestId('recipe-photo');
    expect(recipePhoto).toHaveLength(1);
  });
  test('Testa elementos na tela rota Drinks', async () => {
    renderWithRouter(<App />, { route: '/drinks/11007' });
    const recipeTitle = await screen.findAllByTestId('recipe-title');
    expect(recipeTitle).toHaveLength(1);
    const recipeInstructions = await screen.findAllByTestId('instructions');
    expect(recipeInstructions).toHaveLength(1);
    const recipeCategory = await screen.findAllByTestId('recipe-category');
    expect(recipeCategory).toHaveLength(1);
    const recipePhoto = await screen.findAllByTestId('recipe-photo');
    expect(recipePhoto).toHaveLength(1);
  });
  test('Testa se o botao startRecipe funciona', async () => {
    const { user } = renderWithRouter(<App />, { route: '/drinks/11007' });
    await waitForElementToBeRemoved(screen.getByText('Loading'));
    const getStartRecipeButton = screen.getByRole('button', { name: 'Start Recipe' });
    await user.click(getStartRecipeButton);
    const inProgressText = screen.getByText(/RecipesInProgress/i);
    expect(inProgressText).toBeInTheDocument();
  });
  test('Teste se ao clicar no botao de compartilhar a mensagem Link Copied aparece na tela', async () => {
    const { user } = renderWithRouter(<App />, { route: '/drinks/178319' });
    await waitForElementToBeRemoved(screen.getByText('Loading'));
    const getShareButton = screen.getByTestId('share-btn');
    await user.click(getShareButton);
    const inProgressText = screen.getByText(/Link Copied/i);
    expect(inProgressText).toBeInTheDocument();
  });
});
