import React from 'react';

import { Route, Switch, useLocation, Link, useHistory } from 'react-router-dom';

import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';

import './Header.css';

function Header({ color, onHeaderButtonClick }) {
  const location = useLocation();
  const history = useHistory();
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <div className={`header ${color && `header_color_${color}`}`}>
      <div className='header__content'>
        <div className='header__logo' onClick={() => history.push('/')}>
          NewsExplorer
        </div>
        <div className='header__bar'>
          <ul className='menu'>
            <li className='menu__item'>
              <Link
                className={`menu__link ${
                  location.pathname === '/' ? 'menu__link_active_white' : ''
                }`}
                to='/'
              >
                Главная
              </Link>
            </li>
            {currentUser.loggedOn && (
              <li className='menu__item'>
                <Link
                  className={`menu__link ${
                    location.pathname === '/saved-news' ? 'menu__link_active_black' : ''
                  }`}
                  to='/saved-news'
                >
                  Сохранённые статьи
                </Link>
              </li>
            )}
          </ul>
          <button className='header__button' onClick={onHeaderButtonClick}>
            {currentUser.loggedOn ? (
              <>
                {currentUser.user.name}
                <svg
                  className='header__button-icon'
                  width='18'
                  height='16'
                  viewBox='0 0 18 16'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    fillRule='evenodd'
                    clipRule='evenodd'
                    d='M6 2L2 2L2 14H6V16H2C0.89543 16 0 15.1046 0 14V2C0 0.89543 0.895432 0 2 0H6V2ZM13.5856 9.00002L9.29274 13.1339L10.707 14.4958L17.4141 8.03706L10.707 1.57837L9.29274 2.9402L13.5856 7.0741H4V9.00002H13.5856Z'
                    fill={location.pathname === '/saved-news' ? '#1A1B22' : '#fff'}
                  />
                </svg>
              </>
            ) : (
              'Авторизация'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Header;
