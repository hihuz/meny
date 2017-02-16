import React from 'react';

const Header = ({ page, children }) => {
  let bgImage = 'header';
  if (page === 'add') { bgImage = 'tools'; }
  const styles = {
    backgroundImage: `url("../public/${bgImage}.jpg")`
  };
  return (
    <header className="header" style={styles}>
      {children}
    </header>
  );
};

export default Header;
