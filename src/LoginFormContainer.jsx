import React, { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { changeLoginField, requestLogin, logout } from './actions';
import { get } from './utils';
import LoginForm from './LoginForm';
import LogoutForm from './LogoutForm';

export default function LoginFormContainer() {
  const dispatch = useDispatch();

  const { email, password } = useSelector(get('loginFields'));
  const accessToken = useSelector(get('accessToken'));

  const [error, setError] = useState(false);

  function handleSubmit() {
    if (!email.trim() || !password.trim()) {
      setError(true);
      return;
    }
    dispatch(requestLogin());
  }

  function handleChange({ name, value }) {
    dispatch(changeLoginField({ name, value }));
  }

  function handleClickLogout() {
    dispatch(logout());
  }

  return (
    <>
      {accessToken ? (
        <LogoutForm onClick={handleClickLogout} />
      ) : (
        <LoginForm
          fields={{ email, password }}
          onSubmit={handleSubmit}
          onChange={handleChange}
          error={error}
        />
      )}
    </>
  );
}