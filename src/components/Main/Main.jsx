import React from 'react';
import About from '../About/About';
import Footer from '../Footer/Footer';
import MainHeader from '../MainHeader/MainHeader';
import NewsCardList from '../NewsCardList/NewsCardList';

import './Main.css';

function Main({ onHeaderButtonClick, onSearch, isSearchResultsShown }) {
  return (
    <div className='main'>
      <MainHeader onHeaderButtonClick={onHeaderButtonClick} onSearch={onSearch}></MainHeader>
      <NewsCardList isShown={isSearchResultsShown}>
        <h2 className='news-card-list__title'>Результаты поиска</h2>
      </NewsCardList>
      <About></About>
      <Footer></Footer>
    </div>
  );
}

export default Main;
