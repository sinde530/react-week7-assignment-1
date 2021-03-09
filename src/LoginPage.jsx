import React from 'react';

export default function LoginPage() {
  return (
    <div>
      <h1>Login</h1>
      <div>
        <label htmlFor="login-email">
          E-mail
        </label>
        <input
          type="email"
          id="login-email"
        />
      </div>
      <div>
        <label htmlFor="login-password">
          Password
        </label>
        <input
          type="password"
          id="login-password"
        />
      </div>
    </div>
  );
}
