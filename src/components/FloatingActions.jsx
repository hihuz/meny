import React from "react";
import FloatingEditButton from "./FloatingEditButton";
import FloatingConfirmButtons from "./FloatingConfirmButtons";

const FloatingActions = ({
  editing,
  switchMode,
  cancelChanges,
  saveChanges,
  isValid,
  showModal
}) => (
  <div className="floating-actions">
    {editing ? (
      <FloatingConfirmButtons
        cancelChanges={cancelChanges}
        saveChanges={saveChanges}
        isValid={isValid}
      />
    ) : (
      <FloatingEditButton switchMode={switchMode} showModal={showModal} key="fab_1" />
    )}
  </div>
);

export default FloatingActions;
