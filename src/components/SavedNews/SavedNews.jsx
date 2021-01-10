import React from 'react';
import Footer from '../Footer/Footer';
import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader';

import NewsCardList from '../NewsCardList/NewsCardList';

function Main(props) {
  //
  return (
    <>
      <SavedNewsHeader></SavedNewsHeader>
      <NewsCardList isShown={true} />
      <Footer />
    </>
  );
}

export default Main;
