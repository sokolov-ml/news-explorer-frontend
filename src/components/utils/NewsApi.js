class NewsApi {
  constructor(options) {
    this._options = options;
    this._url = new URL(options.baseUrl);
    this._path = {
      everything: '/everything',
    };
  }

  _fetch(path, params) {
    const searchParams = new URLSearchParams({
      apiKey: 'beaeceab4f2e4c7a91c632c1f9a59aa4',
      ...params,
    }).toString();

    const url = `${this._url}${path}?${searchParams.toString()}`;
    // console.log(url);
    return fetch(url, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'GET',
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  search(word, page = 1) {
    const params = {
      q: word,
      sortBy: 'popularity',
      pageSize: 3,
      page,
      from: new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      language: 'ru',
    };

    return this._fetch(this._path.everything, params);
  }
}

const newsApi = new NewsApi({
  // baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-14',
  baseUrl: 'https://nomoreparties.co/news/v2',
});

export default newsApi;
