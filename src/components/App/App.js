import React from 'react';
import { Route, Switch, useLocation, Link, useHistory } from 'react-router-dom';

import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';
import Header from '../Header/Header';
import Main from '../Main/Main';
import SavedNews from '../SavedNews/SavedNews';

import PopupSignIn from '../PopupSignIn/PopupSignIn';
import PopupSignOn from '../PopupSignOn/PopupSignOn';

import mainApi from '../utils/MainApi';
import newsApi from '../utils/NewsApi';

import './App.css';

function App() {
  const [currentUser, setCurrentUser] = React.useState({ loggedOn: false, user: {} });

  const [newsCards, setNewsCards] = React.useState([]);
  const [currentSearch, setCurrentSearch] = React.useState({
    keyWord: '',
    nextPage: 0,
    articles: [],
  });
  const [searchResponse, setSearchResponse] = React.useState({});

  const [isPopupSignInOpened, setIsPopupSignInOpened] = React.useState(false);
  const [isPopupSignOnOpened, setIsPopupSignOnOpened] = React.useState(false);

  const [isSearchResultsShown, setIsSearchResultsShown] = React.useState(false);

  let history = useHistory();

  React.useEffect(() => {
    if (localStorage.token) {
      checkLocalToken();
    }

    if (localStorage.currentSearch) {
      setCurrentSearch(JSON.parse(localStorage.getItem('currentSearch')));
    }
  }, []);

  React.useEffect(() => {
    localStorage.setItem('currentSearch', JSON.stringify(currentSearch));
    setIsSearchResultsShown(true);
  }, [currentSearch]);

  function checkLocalToken() {
    console.log(localStorage.token);
    mainApi
      .checkCurrentToken()
      .then((data) => {
        console.log(data);
        if (data) {
          console.log(data);
          setCurrentUser({ loggedOn: true, user: data });
          return data;
        }
      })
      .catch((err) => {
        console.error('something wrong');
      });
  }

  function closeAllPopups() {
    setIsPopupSignInOpened(false);
    setIsPopupSignOnOpened(false);
  }

  function handleLogin(obj, func) {
    return mainApi
      .signin(obj.email, obj.password)
      .then(() => {
        checkLocalToken();
        closeAllPopups();
      })
      .catch(() => {
        console.error('can`t login');
      });
  }

  function handleLogoff() {
    localStorage.removeItem('token');
    setCurrentUser({ loggedOn: false, user: {} });
    history.push('/');
  }

  function handleRegister(obj, func) {
    return mainApi
      .signup(obj.name, obj.email, obj.password)
      .then((data) => {
        // setIsUserLoggedIn(true);
        // history.push('/signin');
        // setInfoTooltipStatus(true);
        // setIsInfoTooltipPopupOpen(true);
        closeAllPopups();
        setIsPopupSignInOpened(true);
      })
      .catch(() => {
        console.error('can`t register');
        // setInfoTooltipStatus(false);
        // setIsInfoTooltipPopupOpen(true);
      });
    // .finally(() => {
    //   func(false);
    // });
  }

  const onHeaderButtonClick = () => {
    console.log('click');
    if (currentUser.loggedOn) {
      handleLogoff();
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

  function onSearch(keyWord, pageNumber, articles) {
    return newsApi.search(keyWord, pageNumber).then((response) => {
      console.log(response);

      const result = {
        keyWord,
        nextPage: pageNumber + 1,
        totalResults: response.totalResults,
        articles: [...articles, ...response.articles],
      };

      setCurrentSearch(result);
    });
  }

  function onSearchNew(keyWord) {
    // setCurrentSearch({ keyWord, nextPage: 1, articles: [] });
    return onSearch(keyWord, 1, []);
  }

  function onSearchMore() {
    return onSearch(currentSearch.keyWord, currentSearch.nextPage, currentSearch.articles);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='App'>
        <Switch>
          <Route path='/' exact>
            <Main
              onHeaderButtonClick={onHeaderButtonClick}
              isSearchResultsShown={isSearchResultsShown}
              onSearch={onSearchNew}
              onSearchMore={onSearchMore}
              currentSearch={currentSearch}
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
          onSubmit={handleLogin}
        />
        <PopupSignOn
          isOpen={isPopupSignOnOpened}
          onClose={closeAllPopups}
          onLink={openSignInForm}
          onSubmit={handleRegister}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
