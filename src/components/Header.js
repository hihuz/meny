import React from 'react';

const Header = ({ background, children }) => {
  const styles = {
    backgroundImage: background === 'landing' ? 'url("../public/landing.jpg")' : 'none'
  }
  return (
    <header className='header' style={styles}>
      {children}
    </header>
  );
};

export default Header;
