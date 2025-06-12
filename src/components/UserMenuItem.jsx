import React from "react";

const UserMenuItem = ({ userClickHandler, user }) => (
  <a onClick={userClickHandler} data-id={user.id} data-sn={user.sn}>
    <li className="user-menu__item">{user.sn}</li>
  </a>
);

export default UserMenuItem;
