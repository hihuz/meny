import React from 'react';
import { connect } from 'react-redux';
import Link from 'react-router/Link';

const Transition = ({ title, left, right }) => (
  <main className="transition-screen basic-shit-show">
    <div className="transition-main-text">
      {title}
    </div>
    <div className="transition-nav">
      <div className="transition-left">
        <Link to={`/${left.path}`}>
          <div className="transition-left-arrow"></div>
          <div className="transition-left-text">{left.text}</div>
        </Link>
      </div>
      <div className="transition-right">
        <Link to={`/${right.path}`}>
          <div className="transition-right-arrow"></div>
          <div className="transition-right-text">{right.text}</div>
        </Link>
      </div>
    </div>
  </main>
);

export default Transition;
