import { useEffect, useState } from 'react';
import Header from '../../Components/Header';

function Profile() {
  const [user, setUser] = useState({ email: '' });

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
    }
  }, []);

  /* const navigate = useNavigate(); */

  return (
    <div>
      <Header />
      <div>
        <p data-testid="profile-email">{user.email}</p>

        <button data-testid="profile-done-btn">Done Recipes</button>
        {' '}
        <button data-testid="profile-favorite-btn">Favorite Recipes</button>
        {' '}
        <button data-testid="profile-logout-btn">Logout</button>
      </div>
    </div>
  );
}

export default Profile;
