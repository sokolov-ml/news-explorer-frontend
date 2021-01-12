import React from 'react';
import Header from '../Header/Header';

import './MainHeader.css';

function MainHeader({ onHeaderButtonClick, onSearch }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch();
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
          <input
            className='main-header__input'
            type='text'
            defaultValue='Природа'
            placeholder='Введите тему новости'
            required
          />
          <button className='main-header__button'>Искать</button>
        </form>
      </div>
    </div>
  );
}

export default MainHeader;
