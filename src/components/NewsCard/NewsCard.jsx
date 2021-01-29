import React from 'react';

import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';

import './NewsCard.css';

function NewsCard({ card, saveArticle, openLoginPopup, removeArticle }) {
  const currentUser = React.useContext(CurrentUserContext);

  const [isSaved, setIsSaved] = React.useState(false);

  function formatDate(s) {
    const d = new Date(s);
    const months = 'января,февраля,марта,апреля,мая,июня,июля,августа,сентября,октября,ноября,декабря'.split(
      ',',
    );

    return `${d.toLocaleString('ru', { day: 'numeric' })} ${
      months[d.toLocaleString('ru', { month: 'numeric' }) - 1]
    }, ${d.toLocaleString('ru', { year: 'numeric' })}`;
  }

  function handleButtonClick() {
    if (!currentUser.loggedOn) {
      return openLoginPopup();
    }

    if (card.isSaved) {
      removeArticle(card._id);
    } else {
      saveArticle(card);
    }

    //
  }

  return (
    <li className='news-card'>
      <button
        className={`news-card__bookmark ${card.isSaved && 'news-card__bookmark_saved'}`}
        onClick={handleButtonClick}
      >
        <svg
          className='news-card__bookmark-icon'
          width='24'
          height='24'
          viewBox='0 0 24 24'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M11.3822 15.7137L6 19.9425V4L18 4V19.9425L12.6178 15.7137L12 15.2283L11.3822 15.7137Z'
            // stroke='#B6BCBF'
            stroke='#1a1b22'
            strokeWidth='2'
          />
        </svg>
      </button>
      {!currentUser.loggedOn && (
        <p className='news-card__bookmark-hint'>Войдите, чтобы сохранять статьи</p>
      )}
      <img src={card.image} alt={card.title} className='news-card__photo' />
      <div className='news-card__content'>
        <p className='news-card__date'>{formatDate(card.date)}</p>
        <h3 className='news-card__title'>{card.title.replace(/(.+) -.+$/, '$1')}</h3>
        <p className='news-card__text'>{card.description}</p>
        <p className='news-card__source'>{card.source}</p>
      </div>
    </li>
  );
}

export default NewsCard;
