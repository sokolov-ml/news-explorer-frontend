class MainApi {
  constructor(options) {
    this._options = options;
    this._url = options.baseUrl;
    this._path = {
      default: '/',
      user: '/users/me',
      articles: '/articles',
      signup: '/signup',
      signin: '/signin',
    };
  }

  _fetch(path, method = 'GET', body) {
    return fetch(`${this._options.baseUrl}${path}`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      method: method,
      body: JSON.stringify(body),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  signin(email, password) {
    return this._fetch(this._path.signin, 'POST', {
      email: email,
      password: password,
    }).then((data) => {
      localStorage.setItem('token', data.token);
      return data;
    });
  }

  signup(name, email, password) {
    return this._fetch(this._path.signup, 'POST', {
      name: name,
      email: email,
      password: password,
    });
  }

  checkCurrentToken() {
    return this._fetch(this._path.user);
  }

  getArticles() {
    return this._fetch(this._path.articles);
  }

  saveArticle(article) {
    return this._fetch(this._path.articles, 'POST', article).then((data) => {
      return data;
    });
  }

  removeArticle(articleId) {
    return this._fetch(`${this._path.articles}/${articleId}`, 'DELETE').then((data) => {
      return data;
    });
  }
}

const mainApi = new MainApi({
  // baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-14',
  baseUrl: 'https://api.sokolov-ml.students.nomoreparties.xyz',
});

export default mainApi;
