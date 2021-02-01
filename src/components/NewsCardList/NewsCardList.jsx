import React from 'react';
import NewsCard from '../NewsCard/NewsCard';

import './NewsCardList.css';

function NewsCardList({
  children,
  isShown,
  articles,
  onSearchMore,
  searchMoreCounter,
  saveArticle,
  openLoginPopup,
  removeArticle,
}) {
  return (
    <div className={`news-card-list ${isShown && 'news-card-list_visible'}`}>
      {children}
      <ul className='news-card-list__items'>
        {articles &&
          articles.map((card, index) => (
            <NewsCard
              card={card}
              key={index}
              saveArticle={saveArticle}
              removeArticle={removeArticle}
              openLoginPopup={openLoginPopup}
            />
          ))}
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
