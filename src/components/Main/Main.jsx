import React from 'react';

import GraySection from '../GraySection/GraySection';

import About from '../About/About';
import Footer from '../Footer/Footer';
import MainHeader from '../MainHeader/MainHeader';
import NewsCardList from '../NewsCardList/NewsCardList';

import './Main.css';

function Main({ onHeaderButtonClick, onSearch, isSearchResultsShown }) {
  return (
    <div className='main'>
      <MainHeader onHeaderButtonClick={onHeaderButtonClick} onSearch={onSearch}></MainHeader>

      <GraySection>
        <NewsCardList isShown={isSearchResultsShown}>
          <h2 className='news-card-list__title'>Результаты поиска</h2>
        </NewsCardList>
      </GraySection>

      <div className='main__content'>
        <About></About>
        <Footer></Footer>
      </div>
    </div>
  );
}

export default Main;
