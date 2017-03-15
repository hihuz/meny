import React from 'react';
import Link from 'react-router-dom/Link';
import RecipeLink from '../components/RecipeLink';

const Transition = ({ title, left, right, hideTransition }) => (
  <main className="transition-screen show-anim">
    <div className="transition-content">
      <div className="text-centered">
        {title}
      </div>
      <Link
        to="/browse"
        onClick={hideTransition}
      >
        <div className="transition-image" />
      </Link>
      <div className="transition-nav">
        <Link
          to={left.path}
          onClick={hideTransition}
          className="transition-link"
        >
          <i className="icon-share flipped-icon" />
          <div className="transition-left-text">{left.text}</div>
        </Link>
        <RecipeLink
          id={right.path}
          type="transition-link"
        >
          <i className="icon-share" />
          <div className="transition-right-text">{right.text}</div>
        </RecipeLink>
      </div>
    </div>
  </main>
);

export default Transition;
