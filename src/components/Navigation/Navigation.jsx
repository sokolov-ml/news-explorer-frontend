import React from 'react';

import { Link } from 'react-router-dom';

import './Navigation.css';

import githubLogo from '../../images/navigation/github-logo.svg';
import facebookLogo from '../../images/navigation/facebook-logo.svg';

function Navigation(props) {
  return (
    <ul className='navigation'>
      <li className='navigation__item'>
        <Link className='navigation__link' to='/'>
          Главная
        </Link>
      </li>
      <li className='navigation__item'>
        <a
          href='https://praktikum.yandex.ru/'
          className='navigation__link'
          target='_blank'
          rel='noopener noreferrer'
        >
          Яндекс.Практикум
        </a>
      </li>
      <li className='navigation__item'>
        <a
          href='https://www.github.com/'
          className='navigation__link'
          target='_blank'
          rel='noopener noreferrer'
        >
          <img src={githubLogo} alt='github' className='navigation__icon' />
        </a>
      </li>
      <li className='navigation__item'>
        <a
          href='https://www.facebook.com/'
          className='navigation__link'
          target='_blank'
          rel='noopener noreferrer'
        >
          <img src={facebookLogo} alt='facebook' className='navigation__icon' />
        </a>
      </li>
    </ul>
  );
}

export default Navigation;
