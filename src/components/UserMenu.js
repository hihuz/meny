import React from 'react';
import UserMenuItem from './UserMenuItem';

// props that will be used later :
// loggedIn,
// searchBar,
const UserMenu
 = ({
  curUser,
  users,
  userClickHandler,
  menuClickHandler,
  isMenuVisible
}) => {
   const styles = {
     backgroundImage: `url("../public/${curUser.id}.jpg")`
   };
   return (
     <div className="nav__user">
       <a className="user-menu__button" style={styles} onClick={menuClickHandler}>
        Ouvrir le menu
       </a>
       <div className={`user-menu${isMenuVisible ? ' user-menu--visible' : ''}`}>
         <ul className={`user-menu__list${isMenuVisible ? ' user-menu__list--visible' : ''}`}>
           {users.map(user => (
             <UserMenuItem userClickHandler={userClickHandler} key={user.id} user={user} />
          ))}
         </ul>
       </div>
     </div>
   );
 };

export default UserMenu;
