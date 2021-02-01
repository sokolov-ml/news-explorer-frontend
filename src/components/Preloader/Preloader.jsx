import React from 'react';

import './Preloader.css';

function Preloader(props) {
  return (
    <div className='preloader'>
      <i className='preloader__circle'></i>
      <p className='preloader__caption'>Идёт поиск новостей...</p>
    </div>
  );
}

export default Preloader;
