import { useDispatch, useSelector } from 'react-redux';
import React, { useRef, useEffect } from 'react';
import { changeCheckboxForm, changeFormModal } from '../../../store/reducers/form';

import style from './form.module.css';
import Button from '../../ui/button';


function Form({ link, title, text, submit, valuePassword, valueLogin, changeLogin, changePassword, loginName, passwordName, errorPassword, errorLogin, error }) {

  const checked = useSelector(state => state.form.isCheckedCheckbox);
  const dispatch = useDispatch();
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  function handleCheckbox() {
    dispatch(changeCheckboxForm())
  }

  const handleChangeForm = () => {
    dispatch(changeFormModal())
  }


  return (
    <div className={style.overlay}>
      <form onSubmit={submit} className={style.form}>
        <span onClick={handleChangeForm} className={style.link}>{link}</span>
        <h1 className={style.title}>{title}</h1>
        <div className={style.wrapper}>
          <div className={style.inner}>
            <input
              ref={inputRef}
              value={valueLogin}
              onChange={changeLogin}
              name={loginName}
              className={style.input}
              type="text"
              placeholder='Логин' />
            {{ errorLogin } && <span className={style.invalid}>{errorLogin}</span>}
          </div>
          <div className={style.inner}>
            <input
              value={valuePassword}
              onChange={changePassword}
              name={passwordName}
              className={style.input}
              type="password"
              placeholder='Пароль' />
            {{ errorPassword } && <span className={style.invalid}>{errorPassword}</span>}
          </div>
          <label className={style['checkbox-label']}>
            {!checked
              ? <span className={style['custom-checkbox']}></span>
              : <span className={style.active}></span>
            }
            <input
              className={style.checkbox}
              type="checkbox"
              checked={checked} onChange={handleCheckbox} />
            Я согласен получать обновления на почту
          </label>
          {{ error } && <span className={style['invalid-data']}>{error}</span>}
        </div>
        <Button click={null} text={text} />
      </form>
    </div>
  )
}

export default Form;