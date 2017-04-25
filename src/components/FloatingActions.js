import React from 'react';
import FloatingEditButton from './FloatingEditButton';
import FloatingConfirmButtons from './FloatingConfirmButtons';

const FloatingActions = ({
  editing,
  switchMode,
  deleteRecipe,
  cancelChanges,
  saveChanges,
  isValid
}) => (
  <div className="floating-actions">
    {editing ?
      <FloatingConfirmButtons
        cancelChanges={cancelChanges}
        saveChanges={saveChanges}
        isValid={isValid}
      /> :
      <FloatingEditButton switchMode={switchMode} deleteRecipe={deleteRecipe} key="fab_1" />
    }
  </div>
);

export default FloatingActions;
