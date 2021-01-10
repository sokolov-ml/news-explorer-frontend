import React from 'react';

import Navigation from '../Navigation/Navigation';

import './Footer.css';

function Footer(props) {
  return (
    <div className='footer'>
      <p className='footer__copyright'>© 2020 Supersite, Powered by News API</p>
      <Navigation></Navigation>
    </div>
  );
}

export default Footer;
