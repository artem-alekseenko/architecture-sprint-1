import React, { useState, useContext } from 'react';
import AuthContext from './AuthContext';
import { Link } from 'react-router-dom';

import '../styles/auth-form/auth-form.css';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { onRegister } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister({ email, password });
  };

  return (
      <div className="auth-form">
        <form className="auth-form__form" onSubmit={handleSubmit}>
          <div className="auth-form__wrapper">
            <h3 className="auth-form__title">Регистрация</h3>
            <label className="auth-form__input">
              <input
                  type="email"
                  name="email"
                  id="email"
                  className="auth-form__textfield"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
              />
            </label>
            <label className="auth-form__input">
              <input
                  type="password"
                  name="password"
                  id="password"
                  className="auth-form__textfield"
                  placeholder="Пароль"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
              />
            </label>
          </div>
          <div className="auth-form__wrapper">
            <button className="auth-form__button" type="submit">
              Зарегистрироваться
            </button>
            <p className="auth-form__text">
              Уже зарегистрированы?{' '}
              <Link className="auth-form__link" to="/signin">
                Войти
              </Link>
            </p>
          </div>
        </form>
      </div>
  );
};

export default Register;
