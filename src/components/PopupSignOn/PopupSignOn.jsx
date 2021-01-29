import React from 'react';

import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';
import PopupWithForm from '../PopupWithForm/PopupWithForm';

export default function PopupSignOn(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const [isLoading, setIsLoading] = React.useState(false);

  const [inputValues, setInputValues] = React.useState({
    email: { value: '', validationMessage: true },
    password: { value: '', validationMessage: true },
    name: { value: '', validationMessage: true },
    isFormValid: false,
  });

  const handleInputChange = (e) => {
    // console.log(inputValues);
    setInputValues({
      ...inputValues,
      [e.target.name]: {
        value: e.target.value,
        validationMessage: e.target.validationMessage,
        isValid: !e.target.validationMessage,
      },
      isFormValid:
        !e.target.validationMessage &&
        !Object.keys(inputValues).some((key) => {
          if (key !== e.target.name && key !== 'isFormValid') {
            return inputValues[key].validationMessage;
          }
          return false;
        }),
    });
    // console.log(inputValues);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    props
      .onSubmit({
        name: inputValues.name.value,
        email: inputValues.email.value,
        password: inputValues.password.value,
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  return (
    <PopupWithForm {...props} title='Вход' onSubmit={handleSubmit}>
      <label htmlFor='input-signon-user-email' className='popup__field'>
        Email
        <input
          type='email'
          name='email'
          id='input-signon-user-email'
          className='popup__input popup__input_field_email'
          required
          minLength='2'
          maxLength='40'
          value={inputValues.email.value}
          onChange={handleInputChange}
          placeholder='Введите почту'
        />
        <span className='popup__input-error' id='input-signon-user-email-error'>
          {inputValues.email.validationMessage}
        </span>
      </label>
      <label htmlFor='input-signon-user-password' className='popup__field'>
        Пароль
        <input
          type='password'
          name='password'
          id='input-signon-user-password'
          className='popup__input popup__input_field_password'
          required
          minLength='2'
          maxLength='200'
          value={inputValues.password.value}
          onChange={handleInputChange}
          placeholder='Введите пароль'
        />
        <span className='popup__input-error' id='input-signon-user-password-error'>
          {inputValues.password.validationMessage}
        </span>
      </label>
      <label htmlFor='input-signon-user-name' className='popup__field'>
        Имя
        <input
          type='text'
          name='name'
          id='input-signon-user-name'
          className='popup__input popup__input_field_name'
          required
          minLength='2'
          maxLength='200'
          value={inputValues.name.value}
          onChange={handleInputChange}
          placeholder='Введите пароль'
        />
        <span className='popup__input-error' id='input-signon-user-name-error'>
          {inputValues.name.validationMessage}
        </span>
      </label>
      <button type='submit' className='popup__save' disabled={!inputValues.isFormValid}>
        {isLoading ? 'Регистрация...' : 'Зарегистрироваться'}
      </button>
      <p className='popup__text'>
        или{' '}
        <span className='popup__link' onClick={props.onLink}>
          Войти
        </span>
      </p>
    </PopupWithForm>
  );
}
