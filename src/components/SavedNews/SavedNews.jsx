import React from 'react';
import Footer from '../Footer/Footer';

import GraySection from '../GraySection/GraySection';
import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader';

import NewsCardList from '../NewsCardList/NewsCardList';

function SavedNews({ savedArticles, removeArticle }) {
  return (
    <>
      <SavedNewsHeader savedArticles={savedArticles}></SavedNewsHeader>
      <GraySection>
        <NewsCardList isShown={true} articles={savedArticles} removeArticle={removeArticle} />
      </GraySection>
      <Footer />
    </>
  );
}

export default SavedNews;
