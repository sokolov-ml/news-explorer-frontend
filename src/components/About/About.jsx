import React from 'react';

import './About.css';
import photoImg from '../../images/about__photo-img.png';

function About(props) {
  return (
    <div className='about'>
      <div className='about__photo'>
        <img src={photoImg} alt='' className='about__photo-img' />
      </div>
      <div className='about__info'>
        <h2 className='about__title'>Об авторе</h2>
        <p className='about__text'>
          Это блок с описанием автора проекта. Здесь следует указать, как вас зовут, чем вы
          занимаетесь, какими технологиями разработки владеете.
        </p>
        <p className='about__text'>
          Также можно рассказать о процессе обучения в Практикуме, чему вы тут научились, и чем
          можете помочь потенциальным заказчикам.
        </p>
      </div>
    </div>
  );
}

export default About;
