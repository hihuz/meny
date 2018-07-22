import React from "react";

const Header = ({ page, children, img, id }) => {
  let bgImage = "header";
  if (page === "add") {
    bgImage = "tools";
  } else if (page === "recipe") {
    bgImage = img ? id : "woof";
  }
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
