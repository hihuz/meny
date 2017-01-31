import React from 'react';

const Header = ({ page, children }) => {
  /*
  let bgImage = 'url("../public/header.jpg")';
  if (page === '???') { bgImage = '???' }
  const styles = {
    backgroundImage: bgImage
  };
  */
  return (
    <header className="header">
      {children}
    </header>
  );
};

export default Header;
