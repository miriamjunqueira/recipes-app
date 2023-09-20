import React from 'react';

export default function Login() {
  return (
    <div>
      <form>
        <input type="email" data-testid="email-input" />
        <input type="password" data-testid="password-input" />
        <button data-testid="login-submit-btn">Enter</button>
      </form>
    </div>
  );
}
