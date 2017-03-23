import React from 'react';

const FloatingActions = ({ editing, switchMode, cancelChanges, saveChanges, isValid }) => (
  <div className="floating-actions">
    {editing ?
      <div className="floating-buttons">
        {isValid ?
          <button className="edit-button" onClick={saveChanges}>
            <i className="icon-floppy-o" />
          </button> : null}
        <button className="edit-button" onClick={cancelChanges}>
          <i className="icon-undo" />
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
