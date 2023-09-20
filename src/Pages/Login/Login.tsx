import React, { useState } from 'react';

const INITIAL_DATA_USER = {
  email: '',
  password: '',
};

export default function Login() {
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

  return (
    <div>
      <form>
        <input
          type="email"
          data-testid="email-input"
          name="email"
          onChange={ handleChange }
        />
        <input
          type="password"
          data-testid="password-input"
          name="password"
          onChange={ handleChange }
        />
        <button data-testid="login-submit-btn" disabled={ !isDisabled }>Enter</button>
      </form>
      <div>{loginData.email}</div>
    </div>
  );
}
