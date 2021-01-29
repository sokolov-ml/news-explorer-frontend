import React from 'react';

import { useLocation } from 'react-router-dom';

import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';

import './NewsCard.css';

function NewsCard({ card, saveArticle, openLoginPopup, removeArticle }) {
  const location = useLocation();

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
      {location.pathname === '/saved-news' ? (
        <p className='news-card__keyword'>{card.keyword}</p>
      ) : (
        ''
      )}
      <button
        className={`news-card__bookmark ${card.isSaved && 'news-card__bookmark_saved'}`}
        onClick={handleButtonClick}
      >
        {location.pathname === '/' ? (
          <svg
            className='news-card__bookmark-icon news-card__bookmark-icon_icon_bookmark'
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
        ) : (
          <svg
            className='news-card__bookmark-icon_icon_trash'
            width='18'
            height='19'
            viewBox='0 0 18 19'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              fillRule='evenodd'
              clipRule='evenodd'
              d='M12 0H6V2H0V4H18V2H12V0ZM2 6V17C2 18.1046 2.89543 19 4 19H14C15.1046 19 16 18.1046 16 17V6H14V17H4V6H2ZM6 6L6 15H8L8 6H6ZM10 6V15H12V6H10Z'
              fill='#1A1B22'
            />
          </svg>
        )}
      </button>
      {!currentUser.loggedOn && (
        <p className='news-card__bookmark-hint'>Войдите, чтобы сохранять статьи</p>
      )}
      <img src={card.image} alt={card.title} className='news-card__photo' />
      <a href={card.link} className='news-card__content' target='_blank' rel='noreferrer noopener'>
        <p className='news-card__date'>{formatDate(card.date)}</p>
        <h3 className='news-card__title'>{card.title.replace(/(.+) -.+$/, '$1')}</h3>
        <p className='news-card__text'>{card.text}</p>
        <p className='news-card__source'>{card.source}</p>
      </a>
    </li>
  );
}
export default NewsCard;
