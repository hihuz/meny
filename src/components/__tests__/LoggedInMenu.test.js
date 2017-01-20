import React from 'react';

const NavBar = ({ loggedIn, searchBar }) => (
  <nav className="navigation">
    <div className="nav__logo">xD</div>
    {
      searchBar ?
      <SearchBar /> :
      <DetailedMenus />
    }
    {
      loggedIn ?
      <LoggedInMenu /> :
      <SignIn />
    }
  </nav>
);

export default NavBar;
