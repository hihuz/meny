import React from 'react';
import UserMenuItem from './UserMenuItem';

const UserMenu
 = ({
  loggedIn,
  searchBar,
  curUser,
  users,
  userClickHandler,
  menuClickHandler,
  isMenuVisible
}) => {
   const styles = {
     backgroundImage: `url("../public/${curUser}.jpg")`
   };
   return (
     <div className="nav__user">
       <a className="user-menu__button" style={styles} onClick={menuClickHandler} />
       <div className={`user-menu${isMenuVisible ? ' user-menu--visible' : ''}`}>
         <ul className={`user-menu__list${isMenuVisible ? ' user-menu__list--visible' : ''}`}>
           {users.map(user => (
             <UserMenuItem userClickHandler={userClickHandler} key={user.id} name={user.sn} />
          ))}
         </ul>
       </div>
     </div>
   );
 };

export default UserMenu
;
