import React from 'react';
import Link from 'react-router/Link';

const NavBar = ({ loggedIn, searchBar }) => (
  <nav className="nav">
    <Link to="/" className="nav__logo">
      Meny
    </Link>
    <div className='nav__list'>
      <Link to="/browse" className='nav__list-item'>
        Parcourir
      </Link>
      <Link to="/favorites" className='nav__list-item'>
        Favoris
      </Link>
      <Link to="/add" className='nav__list-item'>
        Ajouter
      </Link>
    </div>
    <div className="nav__user">
      <Link to="/" className="nav__user-link">
        ._.
      </Link>
    </div>
  </nav>
);

export default NavBar;
