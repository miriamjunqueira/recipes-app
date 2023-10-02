import { screen, waitFor } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import Recipes from '../Components/Recipes/Recipes';

describe.only('Teste a página de receitas', () => {
  test('Testa a renderização padrão de comidas', async () => {
    renderWithRouter(<Recipes />, { route: '/meals' });

    const arrayDeComidas = ['Corba', 'Sushi', 'Burek', 'Kumpir', 'Bistek', 'Tamiya', 'Poutine', 'Lasagne', 'Kafteji', 'Wontons', 'Dal fry', 'Koshari'];

    waitFor(() => {
      arrayDeComidas.forEach(async (comida) => {
        const title = await screen.findByRole('heading', { name: `${comida}` });
        expect(title).toBeInTheDocument();
      });
    });
  });

  test('Testa a renderização padrão de bebidas', async () => {
    renderWithRouter(<Recipes />, { route: '/drinks' });

    const arrayDeBebidas = ['GG', 'A1', 'Ace', '747', 'Kir', 'ABC', '252', 'AT&T', 'Smut', 'B-53', 'Adam', 'ACID'];

    waitFor(() => {
      arrayDeBebidas.forEach(async (bebida) => {
        const title = await screen.findByRole('heading', { name: `${bebida}` });
        expect(title).toBeInTheDocument();
      });
    });
  });

  test('Testa a mudança de rota quando for retornado apenas 1 elemento', async () => {
    const { user } = renderWithRouter(<Recipes />, { route: '/meals' });

    waitFor(async () => {
      const lupa = await screen.findByRole('img', { name: 'botao-pesquisar' });
      await user.click(lupa);
      const campoInput = await screen.findByRole('textbox');
      await user.type(campoInput, 'Poutine');
      const radioButtonName = await screen.findByText('name');
      await user.click(radioButtonName);
      const searchButton = await screen.getByTestId('exec-search-btn');
      await user.click(searchButton);
      expect(lupa).not.toBeInTheDocument();
    });
  });

  test('Testa alteração na rota ao clicar em uma receita', async () => {
    const { user } = renderWithRouter(<Recipes />, { route: '/meals' });

    waitFor(async () => {
      const primeiraReceitaPadrao = await screen.findByTestId('0-recipe-card');
      await user.click(primeiraReceitaPadrao);
      const titulo = screen.getByRole('heading', { name: 'Instructions' });
      expect(titulo).toBeInTheDocument();
    });
  });

  test('Testa se um botão de categorias de bebidas é exibido', async () => {
    const { user } = renderWithRouter(<Recipes />, { route: '/drinks' });

    // const categoriesArray = ['Ordinary Drink', 'Cocktail', 'Shake', 'Other/Unknown', 'Cocoa', 'All'];

    waitFor(async () => {
      expect(screen.getByText('Ordinary Drink')).toBeInTheDocument();
    });
  });

  test('testa o clique na categoria beef', async () => {
    const { user } = renderWithRouter(<Recipes />, { route: '/meals' });

    const arrayDeComidas = ['Corba', 'Sushi', 'Burek', 'Kumpir', 'Bistek', 'Tamiya', 'Poutine', 'Lasagne', 'Kafteji', 'Wontons', 'Dal fry', 'Koshari'];

    waitFor(() => {
      arrayDeComidas.forEach(async (comida) => {
        const title = await screen.findByRole('heading', { name: `${comida}` });
        expect(title).toBeInTheDocument();
      });

      const botao = screen.getByRole('button', { name: 'Beef' });
      user.click(botao);
      expect(screen.getByText('Beef and Mustard Pie')).toBeInTheDocument();
    });
  });

  test('testa o retorno das receitas inicias em razão da função toogle', async () => {
    const { user } = renderWithRouter(<Recipes />, { route: '/meals' });

    waitFor(async () => {
      const botao = screen.findByRole('button', { name: 'Beef' });
      await user.click(botao);
      expect(screen.getByText('Beef and Mustard Pie')).toBeInTheDocument();
      await user.click(botao);
      expect(screen.getByText('Corba')).toBeInTheDocument();
    });
  });
});
