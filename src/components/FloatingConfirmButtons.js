import React from "react";

const FloatingConfirmButtons = ({ cancelChanges, saveChanges, isValid }) => (
  <div className="floating-buttons">
    {isValid ? (
      <button className="edit-button" onClick={saveChanges}>
        <i className="icon-floppy-o" />
      </button>
    ) : null}
    <button className="edit-button" onClick={cancelChanges}>
      <i className="icon-undo" />
    </button>
  </div>
);

export default FloatingConfirmButtons;
