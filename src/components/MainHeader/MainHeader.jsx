import React from 'react';
import Header from '../Header/Header';

import './MainHeader.css';

function MainHeader({ onHeaderButtonClick, onSearch }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch();
  };

  return (
    <div className='main__header'>
      <Header color='white' onHeaderButtonClick={onHeaderButtonClick} />
      <div className='main__content'>
        <h1 className='main__title'>Что творится в мире?</h1>
        <p className='main__description'>
          Находите самые свежие статьи на любую тему и сохраняйте в своём личном кабинете
        </p>
        <form action='' className='main__form' onSubmit={handleSubmit}>
          <input
            className='main__input'
            type='text'
            defaultValue='Природа'
            placeholder='Введите тему новости'
          />
          <button className='main__button'>Искать</button>
        </form>
      </div>
    </div>
  );
}

export default MainHeader;
