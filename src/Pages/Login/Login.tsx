import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const INITIAL_DATA_USER = {
  email: '',
  password: '',
};

export default function Login() {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState(INITIAL_DATA_USER);

  const inputsValidation = (email: string, password: string) => {
    const regex = /^\S+@\S+\.\S+$/;
    return regex.test(email) && password.length > 6;
  };

  const isDisabled = inputsValidation(loginData.email, loginData.password);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLocalStorage = (userEmail: string) => {
    const userData = { email: userEmail };
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const handleClick = () => {
    handleLocalStorage(loginData.email);
    navigate('/meals');
  };

  return (
    <div>
      <form>
        <label htmlFor="email">
          Email:
          <input
            type="email"
            data-testid="email-input"
            name="email"
            onChange={ handleChange }
          />
        </label>
        Password:
        <input
          type="password"
          data-testid="password-input"
          name="password"
          onChange={ handleChange }
        />
        <button
          onClick={ handleClick }
          data-testid="login-submit-btn"
          disabled={ !isDisabled }
        >
          Enter

        </button>
      </form>
      <div>{loginData.email}</div>
    </div>
  );
}
