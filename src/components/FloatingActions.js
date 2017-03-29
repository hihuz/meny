import React from 'react';
import FloatingEditButton from './FloatingEditButton';
import FloatingConfirmButtons from './FloatingConfirmButtons';

const FloatingActions = ({ editing, switchMode, cancelChanges, saveChanges, isValid }) => (
  <div className="floating-actions">
    {editing ?
      <FloatingConfirmButtons
        key="fab_0"
        cancelChanges={cancelChanges}
        saveChanges={saveChanges}
        isValid={isValid}
      /> :
      <FloatingEditButton switchMode={switchMode} key="fab_1" />
    }
  </div>
);

export default FloatingActions;
