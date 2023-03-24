import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useAuth } from '../../authContextProvider'

import style from './main.module.css';
import PopUp from '../../components/elements/popUp';
import Form from '../../components/elements/form';

import {
  closePopUp,
  setLogin,
  setPassword,
  setErrors,
  setLoginRegistr,
  setPasswordRegistr,
  registrFormSubmit,
  loginFormSubmit,
} from '../../store/reducers/form';



const Main = () => {
  const { signIn } = useAuth()
  const dispatch = useDispatch();

  const {
    isShowPopUp,
    isShowForm,
    login,
    password,
    errors,
    loginRegistr,
    isCheckedCheckbox,
    passwordRegistr } = useSelector(state => state.form);

  const handlerClose = () => {
    dispatch(closePopUp())
  }

  function handleLoginChange(event) {
    dispatch(setLogin(event.target.value));
  }

  function handlePasswordChange(event) {
    dispatch(setPassword(event.target.value));
  }

  function handleLoginRegChange(event) {
    dispatch(setLoginRegistr(event.target.value));
  }

  function handlePasswordRegChange(event) {
    dispatch(setPasswordRegistr(event.target.value));
  }

  useEffect(() => {
    dispatch(setErrors({}));
  }, [login, password, loginRegistr, passwordRegistr, dispatch]);

  function registrForm(loginRegistr, passwordRegistr) {
    const errors = {};
    if (!loginRegistr.length) {
      errors.loginRegistr = 'Поле не должно быть пустым';
    }
    if (loginRegistr.length < 4 && loginRegistr.length > 0) {
      errors.loginRegistr = 'Логин должен содержать не менее 4-х символов';
    }
    if (!passwordRegistr.length) {
      errors.passwordRegistr = 'Поле не должно быть пустым';
    }
    if (passwordRegistr.length < 4 && passwordRegistr.length > 0) {
      errors.passwordRegistr = 'Пароль должен содержать не менее 4-х символов';
    }
    return errors;
  }

  function loginForm(login, password) {
    const errors = {};
    if (!login.length) {
      errors.login = 'Поле не должно быть пустым';
    }
    if (!password.length) {
      errors.password = 'Поле не должно быть пустым';
    }
    if (password.length && login.length) {
      const users = JSON.parse(localStorage.getItem('users'))

      let foundValue = users.filter(obj => obj.login === login && obj.password === password);
      if (!foundValue.length) {
        errors.userData = 'Логин или пароль неверен';
      }
    }
    return errors;
  }


  function handleSubmitRegistr(event) {
    event.preventDefault();
    const errors = registrForm(loginRegistr, passwordRegistr);
    dispatch(setErrors(errors));
    if (Object.keys(errors).length === 0) {
      const data = {
        login: loginRegistr,
        password: passwordRegistr,
        newsletter: isCheckedCheckbox,
      };

      function updateUser(data) {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const existingUserIndex = users.findIndex((user) => user.login === data.login);

        if (existingUserIndex !== -1) {
          // Пользователь уже существует, заменяем его данные
          users[existingUserIndex] = data;
        } else {
          // Пользователя нет в списке, добавляем его
          users.push(data);
        }
        localStorage.setItem('users', JSON.stringify(users));
      }
      updateUser(data)
      dispatch(registrFormSubmit());
    }
  }

  function handleSubmitLogin(event) {
    event.preventDefault();

    const errors = loginForm(login, password);
    dispatch(setErrors(errors));
    if (Object.keys(errors).length === 0) {
      signIn(true)
      dispatch(loginFormSubmit());
    }
  }

  return (
    <main className={style.content}>
      {isShowForm ?
        <Form
          key={1}
          title={'Вход'}
          text={'Войти'}
          link={'Зарегистрироваться'}
          valueLogin={login}
          valuePassword={password}
          changeLogin={handleLoginChange}
          changePassword={handlePasswordChange}
          loginName={'login'}
          passwordName={'password'}
          errorPassword={errors.password}
          errorLogin={errors.login}
          error={errors.userData}
          submit={handleSubmitLogin}
        />
        : <Form
          key={2}
          title={'Регистрация'}
          text={'Зарегистрироваться'}
          link={'Авторизоваться'}
          valueLogin={loginRegistr}
          valuePassword={passwordRegistr}
          changeLogin={handleLoginRegChange}
          changePassword={handlePasswordRegChange}
          loginName={'loginRegistr'}
          passwordName={'passwordRegistr'}
          errorPassword={errors.passwordRegistr}
          errorLogin={errors.loginRegistr}
          error={''}
          submit={handleSubmitRegistr}
        />
      }
      {isShowPopUp &&
        <PopUp handlerClose={handlerClose}
          response={'Регистрация прошла успешно!'}
          textBtn={'Войти'} text={''} />}
    </main>
  )
}

export default Main;

