import React from 'react';

const Header = ({ page, children }) => {
  let bgImage = 'none';
  if (page === 'landing' || page === 'browse') {
    bgImage = 'url("../public/landing.jpg")';
  }
  const styles = {
    backgroundImage: bgImage
  }
  return (
    <header className='header' style={styles}>
      {children}
    </header>
  );
};

export default Header;
