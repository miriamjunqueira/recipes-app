import { screen, waitFor } from '@testing-library/dom';
import { vi } from 'vitest';
import * as APIModules from '../Services/API';
import RecipesInProgress from '../Pages/RecipesInProgress/RecipesInProgress';
import renderWithRouter from '../renderWithRouter';

describe('Testa a página de receitas em progresso', () => {
  test('Testa elementos na tela conforme path /meals', async () => {
    renderWithRouter(<RecipesInProgress />, { route: '/meals/52771/in-progress' });
    const recipeTitle = await screen.findAllByTestId('recipe-title');
    expect(recipeTitle).toHaveLength(1);
    const recipeInstructions = await screen.findAllByTestId('instructions');
    expect(recipeInstructions).toHaveLength(1);
    const recipeCategory = await screen.findAllByTestId('recipe-category');
    expect(recipeCategory).toHaveLength(1);
    const recipePhoto = await screen.findAllByTestId('recipe-photo');
    expect(recipePhoto).toHaveLength(1);
  });

  test('Testa elementos na tela conforme path /drinks', async () => {
    renderWithRouter(<RecipesInProgress />, { route: '/drinks/11007/in-progress' });
    const recipeTitle = await screen.findAllByTestId('recipe-title');
    expect(recipeTitle).toHaveLength(1);
    const recipeInstructions = await screen.findAllByTestId('instructions');
    expect(recipeInstructions).toHaveLength(1);
    const recipeCategory = await screen.findAllByTestId('recipe-category');
    expect(recipeCategory).toHaveLength(1);
    const recipePhoto = await screen.findAllByTestId('recipe-photo');
    expect(recipePhoto).toHaveLength(1);
  });

  test('Testa se há um botão finish recipe na tela', () => {
    renderWithRouter(<RecipesInProgress />, { route: '/drinks/11007/in-progress' });

    const finishBtn = screen.getByTestId('finish-recipe-btn');
    expect(finishBtn).toBeInTheDocument();
    expect(finishBtn).toHaveTextContent('Finish recipe');
  });

  //   test('Testa se o select funciona', () => {
  //     renderWithRouter(<RecipesInProgress />, { route: '/meals/52771/in-progress' });

  //     waitFor(() => {
  //       const checkbox = screen.getByTestId('ingredient-step');
  //       expect(checkbox).toBeInTheDocument();
  //     });
  //   });

  test('Testa se a requisição da API é feita', async () => {
    vi.spyOn(APIModules, 'fetchRecipesDetailsApi');
    renderWithRouter(<RecipesInProgress />);
    waitFor(() => {
      expect(APIModules.fetchRecipesDetailsApi).toHaveBeenCalled();
    });
  });

  test('Teste se ao clicar no botao de compartilhar a mensagem Link Copied aparece na tela', async () => {
    const { user } = renderWithRouter(<RecipesInProgress />, { route: '/meals/52771/in-progress' });
    const getShareButton = screen.getByTestId('share-btn');
    await user.click(getShareButton);
    const inProgressText = screen.getByText(/Link Copied/i);
    expect(inProgressText).toBeInTheDocument();
  });
});
