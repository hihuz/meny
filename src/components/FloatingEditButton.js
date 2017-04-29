import React from 'react';

const FloatingEditButton = ({ switchMode, showModal }) => (
  <div className="floating-buttons">
    <button className="edit-button" onClick={showModal}>
      <i className="icon-trash-o" />
    </button>
    <button className="edit-button" onClick={switchMode}>
      <i className="icon-pencil" />
    </button>
  </div>
);

export default FloatingEditButton;
