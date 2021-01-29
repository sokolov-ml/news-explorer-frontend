import React from 'react';
import Header from '../Header/Header';

import './MainHeader.css';

function MainHeader({ onHeaderButtonClick, onSearch }) {
  const [inputValue, setInputValue] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    onSearch(inputValue).finally(() => {
      setIsLoading(false);
    });
  };

  return (
    <div className='main-header'>
      <Header color='white' onHeaderButtonClick={onHeaderButtonClick} />
      <div className='main-header__content'>
        <h1 className='main-header__title'>Что творится в мире?</h1>
        <p className='main-header__description'>
          Находите самые свежие статьи на любую тему и сохраняйте в своём личном кабинете
        </p>
        <form className='main-header__form' onSubmit={handleSubmit}>
          {/* <fieldset className='main-header__fieldset' disabled={isLoading}> */}
          <input
            className='main-header__input'
            type='text'
            value={inputValue}
            placeholder='Введите тему новости'
            onChange={handleInputChange}
            required
            autoFocus
            disabled={isLoading}
          />
          <button className='main-header__button' disabled={isLoading}>
            {isLoading ? 'Идёт поиск...' : 'Искать'}
          </button>
          {/* </fieldset> */}
        </form>
      </div>
    </div>
  );
}

export default MainHeader;
