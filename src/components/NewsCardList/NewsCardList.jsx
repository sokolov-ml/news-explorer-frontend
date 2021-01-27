import React from 'react';
import NewsCard from '../NewsCard/NewsCard';

import './NewsCardList.css';

function NewsCardList({ children, isShown, newsCards, onSearchMore, searchMoreCounter }) {
  return (
    <div className={`news-card-list ${isShown && 'news-card-list_visible'}`}>
      {children}
      <ul className='news-card-list__items'>
        {newsCards && newsCards.map((card, index) => <NewsCard card={card} key={index} />)}
      </ul>
      {searchMoreCounter > 0 && (
        <button className='news-card-list__button' onClick={onSearchMore}>
          Показать ещё ({searchMoreCounter})
        </button>
      )}
    </div>
  );
}

export default NewsCardList;
