import React from 'react';
import FloatingEditButton from './FloatingEditButton';
import FloatingConfirmButtons from './FloatingConfirmButtons';

const FloatingActions = ({ editing, switchMode, cancelChanges, saveChanges, isValid }) => (
  <div className="floating-actions">
    {editing ?
      <FloatingConfirmButtons
        cancelChanges={cancelChanges}
        saveChanges={saveChanges}
        isValid={isValid}
      /> :
      <FloatingEditButton switchMode={switchMode} />
    }
  </div>
);

export default FloatingActions;
