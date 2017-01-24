import React from 'react';
import Link from 'react-router/Link';

const LandingHeader = () => (
  <section className='main-search'>
    <input type='text' />
    <Link to='/browse' className="main-search__adv-link">Recherche avancée</Link>
  </section>
);

export default LandingHeader;
