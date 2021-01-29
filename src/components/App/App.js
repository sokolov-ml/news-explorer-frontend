import React from 'react';
import { Route, Switch, useLocation, Link, useHistory } from 'react-router-dom';

import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Header from '../Header/Header';
import Main from '../Main/Main';
import SavedNews from '../SavedNews/SavedNews';

import PopupSignIn from '../PopupSignIn/PopupSignIn';
import PopupSignOn from '../PopupSignOn/PopupSignOn';

import mainApi from '../utils/MainApi';
import newsApi from '../utils/NewsApi';

import './App.css';
import PopupWithForm from '../PopupWithForm/PopupWithForm.jsx';

function App() {
  const [currentUser, setCurrentUser] = React.useState({ loggedOn: false, user: {} });

  const [savedArticles, setSavedArticles] = React.useState([]);
  const [currentSearch, setCurrentSearch] = React.useState({
    keyWord: '',
    nextPage: 0,
    articles: [],
  });
  const [searchResponse, setSearchResponse] = React.useState({});

  const [isPopupSignInOpened, setIsPopupSignInOpened] = React.useState(false);
  const [isPopupSignOnOpened, setIsPopupSignOnOpened] = React.useState(false);
  const [isPopupRegisterDoneOpened, setIsPopupRegisterDoneOpened] = React.useState(false);

  const [isSearchResultsShown, setIsSearchResultsShown] = React.useState(false);

  const history = useHistory();

  React.useEffect(() => {
    return mainApi
      .getArticles()
      .then((response) => {
        setSavedArticles(
          response.map((article) => {
            return { ...article, isSaved: true };
          }),
        );
      })
      .catch((err) => {
        console.error('can`t get article');
      });
  }, []);

  React.useEffect(() => {
    if (localStorage.token) {
      checkLocalToken();
    }

    if (localStorage.currentSearch) {
      setCurrentSearch(JSON.parse(localStorage.getItem('currentSearch')));
    }

    if (localStorage.savedArticles) {
      setSavedArticles(JSON.parse(localStorage.getItem('savedArticles')));
    }
  }, []);

  React.useEffect(() => {
    // console.log(currentSearch);
    localStorage.setItem('currentSearch', JSON.stringify(currentSearch));
    setIsSearchResultsShown(true);
  }, [currentSearch]);

  React.useEffect(() => {
    // console.log(savedArticles);
    localStorage.setItem('savedArticles', JSON.stringify(savedArticles));
  }, [savedArticles]);

  function checkLocalToken() {
    // console.log(localStorage.token);
    mainApi
      .checkCurrentToken()
      .then((data) => {
        // console.log(data);
        if (data) {
          // console.log(data);
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
    setIsPopupRegisterDoneOpened(false);
  }

  function handleLogin(obj, func) {
    return mainApi
      .signin(obj.email, obj.password)
      .then(() => {
        checkLocalToken();
        closeAllPopups();
      })
      .catch(() => {
        alert('Ошибка связи с сервером, попробуйте ещё раз.');
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
        openRegisterDoneForm();
      })
      .catch(() => {
        alert('Ошибка связи с сервером, попробуйте ещё раз.');
        console.error('can`t register');
        // setInfoTooltipStatus(false);
        // setIsInfoTooltipPopupOpen(true);
      });
    // .finally(() => {
    //   func(false);
    // });
  }

  const onHeaderButtonClick = () => {
    // console.log('click');
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

  const openRegisterDoneForm = () => {
    closeAllPopups();
    setIsPopupRegisterDoneOpened(true);
  };

  const saveArticle = ({ keyword, title, text, date, source, link, image }) => {
    return mainApi
      .saveArticle({
        keyword,
        title,
        text,
        date,
        source,
        link,
        image,
      })
      .then((response) => {
        const newArticles = currentSearch.articles.map((article) => {
          if (article.link !== response.link) return article;

          return { ...article, isSaved: true, _id: response._id };
        });

        // console.log(newArticles);
        setCurrentSearch({ ...currentSearch, articles: newArticles });
        setSavedArticles([
          ...savedArticles,
          { keyword, title, text, date, source, link, image, _id: response._id, isSaved: true },
        ]);
      })
      .catch((err) => {
        alert('Ошибка связи с сервером, попробуйте ещё раз.');
        console.error('can`t save article');
      });
  };

  const removeArticle = (articleId) => {
    mainApi
      .removeArticle(articleId)
      .then((response) => {
        // console.log(response);
        //удалить из стейта массива сохранённых
        setSavedArticles(savedArticles.filter((a) => a.link !== response.link));

        //снять isSaved из стейта текущих карточек
        setCurrentSearch({
          ...currentSearch,
          articles: currentSearch.articles.map((a) => {
            if (a.link !== response.link) {
              return a;
            }
            return { ...a, isSaved: false };
          }),
        });
      })
      .catch((err) => {
        alert('Ошибка связи с сервером, попробуйте ещё раз.');
        console.error('can`t remove article');
      });
  };

  function onSearch(keyWord, pageNumber, articles) {
    return newsApi
      .search(keyWord, pageNumber)
      .then((response) => {
        // console.log(response);

        const newArticles = response.articles.map((a) => {
          return {
            keyword: keyWord,
            title: a.title,
            text: a.description,
            date: a.publishedAt,
            source: a.source.name,
            link: a.url,
            image: a.urlToImage,
            isSaved: false,
          };
        });

        // console.log(newArticles);

        const result = {
          keyWord,
          nextPage: pageNumber + 1,
          totalResults: response.totalResults,
          articles: [...articles, ...newArticles],
        };

        setCurrentSearch(result);
      })
      .catch((err) => {
        alert('Ошибка связи с сервером, попробуйте ещё раз.');
        console.error('can`t search articles');
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
              saveArticle={saveArticle}
              removeArticle={removeArticle}
              openLoginPopup={openSignInForm}
            ></Main>
          </Route>
          <ProtectedRoute path='/saved-news' loggedIn={currentUser.loggedOn}>
            <Route path='/saved-news'>
              <SavedNews
                onHeaderButtonClick={onHeaderButtonClick}
                savedArticles={savedArticles}
                removeArticle={removeArticle}
              ></SavedNews>
            </Route>
          </ProtectedRoute>
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
        <PopupWithForm
          title={'Пользователь успешно зарегистрирован!'}
          isOpen={isPopupRegisterDoneOpened}
          onClose={closeAllPopups}
          onSubmit={handleRegister}
        >
          <span className='popup__link' onClick={openSignInForm}>
            Войти
          </span>
        </PopupWithForm>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
