import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Profile() {
  const [user, setUser] = useState({ email: '' });
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
    }
  }, []);

  const handleDoneClick = () => navigate('/done-recipes');
  const handleFavoriteClick = () => navigate('/favorite-recipes');
  const handleLogoutClick = () => {
    localStorage.clear();
    navigate('/');
  };
  return (
    <div>
      <div>
        <h1>Profile</h1>
        <p data-testid="profile-email">{user.email}</p>

        <button
          data-testid="profile-done-btn"
          onClick={ handleDoneClick }
        >
          Done Recipes
        </button>
        {' '}
        <button
          data-testid="profile-favorite-btn"
          onClick={ handleFavoriteClick }
        >
          Favorite Recipes

        </button>
        {' '}
        <button
          data-testid="profile-logout-btn"
          onClick={ handleLogoutClick }
        >
          Logout

        </button>
      </div>
    </div>
  );
}

export default Profile;
