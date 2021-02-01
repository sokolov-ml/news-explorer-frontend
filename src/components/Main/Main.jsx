import React from 'react';

import GraySection from '../GraySection/GraySection';

import About from '../About/About';
import Footer from '../Footer/Footer';
import MainHeader from '../MainHeader/MainHeader';
import NewsCardList from '../NewsCardList/NewsCardList';
import Preloader from '../Preloader/Preloader';

import './Main.css';

function Main({
  onHeaderButtonClick,
  onSearch,
  isSearchResultsShown,
  currentSearch,
  onSearchMore,
  saveArticle,
  removeArticle,
  openLoginPopup,
}) {
  const [isLoading, setIsLoading] = React.useState(false);

  function handleSearch(keyword) {
    setIsLoading(true);
    return onSearch(keyword).finally(() => setIsLoading(false));
  }

  return (
    <div className='main'>
      <MainHeader onHeaderButtonClick={onHeaderButtonClick} onSearch={handleSearch}></MainHeader>

      <GraySection>
        {isLoading ? (
          <Preloader />
        ) : (
          <NewsCardList
            isShown={isSearchResultsShown}
            articles={currentSearch.articles}
            onSearchMore={onSearchMore}
            searchMoreCounter={
              currentSearch.articles && currentSearch.totalResults - currentSearch.articles.length
            }
            saveArticle={saveArticle}
            removeArticle={removeArticle}
            openLoginPopup={openLoginPopup}
          >
            <h2 className='news-card-list__title'>
              {currentSearch.totalResults > 0
                ? `Результаты поиска (${currentSearch.totalResults})`
                : 'Ничего не найдено'}
            </h2>
          </NewsCardList>
        )}
      </GraySection>

      <div className='main__content'>
        <About></About>
        <Footer></Footer>
      </div>
    </div>
  );
}

export default Main;
