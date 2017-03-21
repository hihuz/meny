import React from 'react';

const FloatingActions = ({ editing, switchMode, cancelChanges, saveChanges }) => (
  <div className="floating-actions">
    {editing ?
      <div className="floating-buttons">
        <button className="edit-button" onClick={saveChanges}>
          <i className="icon-floppy-o" />
        </button>
        <button className="edit-button" onClick={cancelChanges}>
          <i className="icon-remove" />
        </button>
      </div> :
      <div className="floating-buttons">
        <button className="edit-button" onClick={switchMode}>
          <i className="icon-pencil" />
        </button>
      </div>}
  </div>
);

export default FloatingActions;
