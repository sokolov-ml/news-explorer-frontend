import React from 'react';
import Header from '../Header/Header';

import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';

import './SavedNewsHeader.css';

function SavedNewsHeader({ onHeaderButtonClick }) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <>
      <div className='savednews__header'>
        <Header onHeaderButtonClick={onHeaderButtonClick} color='black'></Header>
        <div className='savednews__caption'>
          <h2 className='savednews__title'>Сохранённые статьи</h2>
          <p className='savednews__greeting'>
            {currentUser.user.name}, у вас {'XXX'} сохранённых статей
          </p>
          <p className='savednews__keywords'>
            По ключевым словам: <span className='savednews__keyword'>Природа</span>
          </p>
        </div>
      </div>
    </>
  );
}

export default SavedNewsHeader;
