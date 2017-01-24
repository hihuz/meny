import React from 'react';
import Link from 'react-router/Link';

const NavBar = ({ loggedIn, searchBar }) => (
  <nav className="nav">
    <Link to="/" className="nav__logo">
      Meny
    </Link>
    <div className='nav__list'>
      <Link to="/browse" className="nav__list-item" activeClassName="nav__list-item--cur">
        Parcourir
      </Link>
      <Link to="/favorites" className="nav__list-item" activeClassName="nav__list-item--cur">
        Favoris
      </Link>
      <Link to="/add" className="nav__list-item" activeClassName="nav__list-item--cur">
        Ajouter
      </Link>
    </div>
    <div className="nav__user">
      <Link to="/" className="nav__user-link">
      </Link>
    </div>
  </nav>
);

export default NavBar;
