import React from 'react';

const UserMenuItem = ({ userClickHandler, name }) => {
  const styles = {
  };
  return (
    <a onClick={userClickHandler} value={name}>
      <li className="user-menu__item">
        {name}
      </li>
    </a>
  );
}

export default UserMenuItem;
