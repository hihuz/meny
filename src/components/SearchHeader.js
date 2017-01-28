import React from 'react';
import Link from 'react-router/Link';

const SearchHeader = ({ handleSearchTermChange, searchTerm, showAdvancedSearch }) => (
  <section className='main-search'>
    <input
      type='text'
      placeholder='Rechercher...'
      value={searchTerm}
      onChange={handleSearchTermChange}
    />
    <Link to='/browse' className="main-search__reg-link">
      <i className="icon-search"></i>
    </Link>
    {showAdvancedSearch ?
      <Link to='/browse' className="main-search__adv-link">Recherche avancée</Link> :
      ''
    }

  </section>
);

export default SearchHeader;
