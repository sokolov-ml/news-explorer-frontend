import React from 'react';
import NewsCard from '../NewsCard/NewsCard';

import './NewsCardList.css';

function NewsCardList({ children, isShown }) {
  const articles = [
    {
      source: {
        id: null,
        name: 'Ria.ru',
      },
      author: '',
      title: 'Спасатели нашли тело мужчины на месте схода лавины под Норильском - РИА НОВОСТИ',
      description:
        'На месте схода лавины в Норильске нашли тело 45-летнего мужчины, сообщили журналистам в управлении Следственного комитета по Красноярскому краю и Хакасии. РИА Новости, 09.01.2021',
      url: 'https://ria.ru/20210109/norilsk-1592371782.html',
      urlToImage:
        'https://cdn21.img.ria.ru/images/sharing/article/1592371782.jpg?15923718851610173172',
      publishedAt: '2021-01-09T06:11:15Z',
      content:
        "https://ria.ru/20210109/norilsk-1592371782.html\r\n/html/head/meta[@name='og:title']/@content\r\n/html/head/meta[@name='og:description']/@content\r\nhttps://cdn25.img.ria.ru/images/07e5/01/09/1592372084_0:… [+666 chars]",
    },
    {
      source: {
        id: null,
        name: 'Vokrug.tv',
      },
      author: null,
      title:
        'Стало известно о состоянии больных коронавирусом Олега Басилашвили и Алисы Фрейндлих - vokrug.tv',
      description:
        'Стало известно о состоянии больных коронавирусом Олега Басилашвили и Алисы Фрейндлих.Информацию об улучшении состояния народных артистов подтвердили в Большом драматическом театре имени Товстоногова.',
      url: 'https://www.vokrug.tv/article/show/16101709971/',
      urlToImage: 'https://www.vokrug.tv/pic/news/1/6/6/c/166c7d52d7e7ef3e60f651f9e2af63a5.jpg',
      publishedAt: '2021-01-09T05:38:00Z',
      content:
        '86- . 2020-, , , . , , .\r\n , . , , . « . , , », . .\r\n, . 57- « », 86- , , , . « ! !» Instagram ( . .).\r\n, , . , Instagram 25- . , , COVID-19 , , . , . , , , , .\r\n« , . , , . , , . , . . , . , . . , .… [+36 chars]',
    },
    {
      source: {
        id: 'lenta',
        name: 'Lenta',
      },
      author: null,
      title:
        'Создатель Natura Siberica незадолго до смерти рассказал о своем наследстве - Lenta.ru',
      description:
        'Создатель брендов Natura Siberica и «Бабушка Агафья» Андрей Трубников не собирался оставлять своим детям наследство. Об этом он рассказал в интервью Forbes незадолго до своей смерти. «Если бы было состояние, не дал бы ничего. Пусть сами зарабатывают. Зачем де…',
      url: 'https://lenta.ru/news/2021/01/09/trubnikov/',
      urlToImage:
        'https://icdn.lenta.ru/images/2021/01/09/08/20210109082425196/share_3faede99c09419e80d26714230bc9c06.jpg',
      publishedAt: '2021-01-09T05:25:35Z',
      content:
        'Natura Siberica « » . Forbes .\r\n« , . . ?», . , \r\n , . « . -, », .\r\n 8 . OU Good Design. «» 84 .\r\n « » 2002 . « », 2012- Natura Siberica.',
    },
    {
      source: {
        id: null,
        name: 'Ura.news',
      },
      author: null,
      title: 'СМИ раскрыли стоимость свадьбы Бузовой и Давы на Мальдивах - URA.Ru',
      description: 'Читайте на URA.RU',
      url: 'https://ura.news/news/1052466282',
      urlToImage:
        'https://s.ura.news/images/news/upload/smm/2021/01/09/facebook_dd6f767a630f400d9b447be32cbb92e2.jpg',
      publishedAt: '2021-01-09T04:06:00Z',
      content: null,
    },
    {
      source: {
        id: 'rbc',
        name: 'RBC',
      },
      author: null,
      title: 'В США задержали закинувшего ноги на стол Пелоси протестующего - РБК',
      description:
        'Мужчина позировал в кресле Пелоси во время штурма Капитолия. Он закинул ноги на стол спикера палаты представителей, забрал с ее стола конверт, а взамен оставил четвертак и «неприятную записку». Мужчине уже предъявили ряд обвинений',
      url: 'https://www.rbc.ru/politics/09/01/2021/5ff91d8d9a7947cf75731e6a',
      urlToImage: 'https://s0.rbk.ru/v6_top_pics/media/img/3/65/756101647117653.jpg',
      publishedAt: '2021-01-09T03:58:31Z',
      content:
        ', , . CBS News.\r\n , , , « », « ». , « ».\r\nNBC News, 60- . : , , .\r\n The Washington Post,  — . , , , , « » .',
    },
    {
      source: {
        id: 'lenta',
        name: 'Lenta',
      },
      author: null,
      title: 'Google заблокировала популярную среди сторонников Трампа соцсеть - Lenta.ru',
      description:
        'Компания Google заблокировала в своем-онлайн магазине социальную сеть Parler, которую часто используют сторонники действующего президента США Дональда Трампа. Согласно заявлению Google, на платформе появлялись призывы к насилию. В компании потребовали от руко…',
      url: 'https://lenta.ru/news/2021/01/09/blokirovca/',
      urlToImage:
        'https://icdn.lenta.ru/images/2021/01/09/04/20210109042626338/share_a22c40bd9661d7bf9579c64ab6f185a2.jpg',
      publishedAt: '2021-01-09T01:28:25Z',
      content:
        'Google - Parler, . Reuters.\r\n Google, . . , , Twitter.\r\n Apple, , , -.\r\n Twitter . , @realDonaldTrump - « ».',
    },
    {
      source: {
        id: null,
        name: 'Ria.ru',
      },
      author: '',
      title: 'Пушков спрогнозировал политику США по отношению к России при Байдене - РИА НОВОСТИ',
      description:
        'Сенатор Алексей Пушков в Telegram спрогнозировал внешнюю политику США при избранном президенте Джо Байдене. РИА Новости, 09.01.2021',
      url: 'https://ria.ru/20210109/pushkov-1592364664.html',
      urlToImage:
        'https://cdn24.img.ria.ru/images/sharing/article/1592364664.jpg?15145951511610155702',
      publishedAt: '2021-01-09T01:03:35Z',
      content:
        "https://ria.ru/20210109/pushkov-1592364664.html\r\n/html/head/meta[@name='og:title']/@content\r\n/html/head/meta[@name='og:description']/@content\r\nhttps://cdn25.img.ria.ru/images/151459/51/1514595152_0:2… [+776 chars]",
    },
    {
      source: {
        id: 'rbc',
        name: 'RBC',
      },
      author: null,
      title: 'Twitter навсегда заблокировал аккаунт Трампа - РБК',
      description:
        'Twitter заблокировал аккаунт Трампа из-за риска «подстрекательства к насилию». Его посты могут подтолкнуть к беспорядкам, в том числе в день инаугурации Байдена, считают в соцсети',
      url: 'https://www.rbc.ru/politics/09/01/2021/5ff8f6599a7947cb28665d7e',
      urlToImage: 'https://s0.rbk.ru/v6_top_pics/media/img/8/36/756101519709368.jpg',
      publishedAt: '2021-01-09T00:26:00Z',
      content:
        'Twitter . , .\r\n« , , , Twitter , - », — Twitter.\r\n , 6 . Twitter 12 , , , .\r\n Twitter . , 75 « ». « , !» — . , , , , , .',
    },
  ];
  return (
    <div className={`news-card-list ${isShown && 'news-card-list_visible'}`}>
      {children}
      <ul className='news-card-list__items'>
        {articles.map((article) => (
          <NewsCard card={article} />
        ))}
      </ul>
    </div>
  );
}

export default NewsCardList;
