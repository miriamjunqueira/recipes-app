import { screen, waitFor } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import Recipes from '../Components/Recipes';

describe('Teste a página de receitas', () => {
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
});
