import { screen } from '@testing-library/dom';
import App from '../App';
import { renderWithRouter } from 'react-router-dom';

describe('Profile Component Tests', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  renderWithRouter(<App />, { route: '/profile' });

  test('renders profile page correctly', () => {
    const profileChecker = screen.getByRole('heading', {
      name: /profile/i,
    });

    expect(profileChecker).toBeInTheDocument();
  });
  it('shows user e-mail when present in LocalStorage', () => {
    const user = { email: 'email@mail.com' };
    localStorage.setItem('user', JSON.stringify(user));
    renderWithRouter(<App />, { route: '/profile' });

    const emailElement = screen.getByTestId('profile-email');
    expect(emailElement).toBeInTheDocument();
    expect(emailElement).toHaveTextContent(user.email);
  });
});
