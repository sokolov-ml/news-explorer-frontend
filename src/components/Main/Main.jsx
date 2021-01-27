import React from 'react';

import GraySection from '../GraySection/GraySection';

import About from '../About/About';
import Footer from '../Footer/Footer';
import MainHeader from '../MainHeader/MainHeader';
import NewsCardList from '../NewsCardList/NewsCardList';

import './Main.css';

function Main({
  onHeaderButtonClick,
  onSearch,
  isSearchResultsShown,
  currentSearch,
  onSearchMore,
}) {
  return (
    <div className='main'>
      <MainHeader onHeaderButtonClick={onHeaderButtonClick} onSearch={onSearch}></MainHeader>

      <GraySection>
        <NewsCardList
          isShown={isSearchResultsShown}
          newsCards={currentSearch.articles}
          onSearchMore={onSearchMore}
          searchMoreCounter={currentSearch.totalResults - currentSearch.articles.length}
        >
          <h2 className='news-card-list__title'>
            {currentSearch.totalResults > 0
              ? `Результаты поиска (${currentSearch.totalResults})`
              : 'Ничего не найдено'}
          </h2>
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
