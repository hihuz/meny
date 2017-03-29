import React from 'react';

const FloatingEditButton = ({ switchMode }) => (
  <div className="floating-buttons">
    <button className="edit-button" onClick={switchMode}>
      <i className="icon-pencil" />
    </button>
  </div>
);

export default FloatingEditButton;
