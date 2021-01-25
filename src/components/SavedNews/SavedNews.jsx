import React from 'react';
import Footer from '../Footer/Footer';

import GraySection from '../GraySection/GraySection';
import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader';

import NewsCardList from '../NewsCardList/NewsCardList';

function Main(props) {
  //
  return (
    <>
      <SavedNewsHeader></SavedNewsHeader>
      <GraySection>
        <NewsCardList isShown={true} />
      </GraySection>
      <Footer />
    </>
  );
}

export default Main;
