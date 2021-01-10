import React from 'react';
import { Route, Switch, useLocation, Link, useHistory } from 'react-router-dom';

import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';
import Header from '../Header/Header';
import Main from '../Main/Main';
import SavedNews from '../SavedNews/SavedNews';

import PopupSignIn from '../PopupSignIn/PopupSignIn';
import PopupSignOn from '../PopupSignOn/PopupSignOn';

import './App.css';

function App() {
  const [currentUser, setCurrentUser] = React.useState({ loggedOn: false, user: {} });

  const [isPopupSignInOpened, setIsPopupSignInOpened] = React.useState(false);
  const [isPopupSignOnOpened, setIsPopupSignOnOpened] = React.useState(false);

  const [isSearchResultsShown, setIsSearchResultsShown] = React.useState(false);

  function closeAllPopups() {
    setIsPopupSignInOpened(false);
    setIsPopupSignOnOpened(false);
  }

  const onHeaderButtonClick = () => {
    console.log('click');
    if (currentUser.loggedOn) {
      setCurrentUser({ loggedOn: false, user: {} });
    } else {
      openSignInForm(true);
    }
  };

  const openSignOnForm = () => {
    closeAllPopups();
    setIsPopupSignOnOpened(true);
  };

  const openSignInForm = () => {
    closeAllPopups();
    setIsPopupSignInOpened(true);
  };

  const setUserLoggedOn = () => {
    setCurrentUser({ loggedOn: true, user: { name: 'Грета' } });
    closeAllPopups();
  };

  const onSearch = () => {
    setIsSearchResultsShown(true);
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='App'>
        <Switch>
          <Route path='/' exact>
            <Main
              onHeaderButtonClick={onHeaderButtonClick}
              isSearchResultsShown={isSearchResultsShown}
              onSearch={onSearch}
            ></Main>
          </Route>
          <Route path='/saved-news'>
            <SavedNews onHeaderButtonClick={onHeaderButtonClick}></SavedNews>
          </Route>
        </Switch>
        <PopupSignIn
          isOpen={isPopupSignInOpened}
          onClose={closeAllPopups}
          onLink={openSignOnForm}
          onSubmit={setUserLoggedOn}
        />
        <PopupSignOn
          isOpen={isPopupSignOnOpened}
          onClose={closeAllPopups}
          onLink={openSignInForm}
          onSubmit={setUserLoggedOn}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
