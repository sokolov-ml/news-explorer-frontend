import React from 'react';
import Popup from '../Popup/Popup';

import './PopupWithForm.css';

export default function PopupWithForm(props) {
  return (
    <Popup isOpen={props.isOpen} onClose={props.onClose}>
      <form className='popup__form' onSubmit={props.onSubmit}>
        <h2 className='popup__heading'>{props.title}</h2>
        {props.children}
      </form>
    </Popup>
  );
}
