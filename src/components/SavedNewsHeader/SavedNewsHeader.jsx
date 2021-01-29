import React from 'react';
import Header from '../Header/Header';

import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';

import './SavedNewsHeader.css';

function SavedNewsHeader({ onHeaderButtonClick, savedArticles }) {
  const currentUser = React.useContext(CurrentUserContext);

  function getKeywords() {
    const keywords = savedArticles
      .map((a) => a.keyword)
      .reduce((a, c) => ((a[c] = (a[c] || 0) + 1), a), Object.create(null));
    const sortable = [];
    for (let keyword in keywords) {
      sortable.push([keyword, keywords[keyword]]);
    }

    sortable.sort(function (a, b) {
      return b[1] - a[1];
    });

    let result;
    if (sortable.length > 0) {
      switch (sortable.length) {
        case 1:
          result = `${result}`;
          break;
        case 2:
          result = `${sortable[0][0]} и ${sortable[1][0]}`;
          break;
        case 3:
          result = `${sortable[0][0]}, ${sortable[1][0]} и ${sortable[2][0]}`;
          break;

        default:
          result = `${sortable[0][0]}, ${sortable[1][0]} и ${sortable.length - 2} другим`;
      }
    }
    return result;
    console.log(sortable);
  }

  return (
    <div className='savednews__header'>
      <Header onHeaderButtonClick={onHeaderButtonClick} color='black'></Header>
      <div className='savednews__caption'>
        <h2 className='savednews__title'>Сохранённые статьи</h2>
        <p className='savednews__greeting'>
          {currentUser.user.name}, у вас {savedArticles && savedArticles.length} сохранённых статей
        </p>
        <p className='savednews__keywords'>
          По ключевым словам: <span className='savednews__keyword'>{getKeywords()}</span>
        </p>
      </div>
    </div>
  );
}

export default SavedNewsHeader;
