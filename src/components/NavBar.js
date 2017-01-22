import React from 'react';
/*import SearchBar from './SearchBar';
import DetailedMenus from './DetailedMenus';
import LoggedInMenu from './LoggedInMenu';
import SignIn from './SignIn';*/

const NavBar = ({ loggedIn, searchBar }) => (
  <nav className="nav">
    nav !
  </nav>
);
/*
const NavBar = ({ loggedIn, searchBar }) => (
  <nav className="nav">
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
*/
export default NavBar;
