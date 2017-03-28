import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import FloatingEditButton from './FloatingEditButton';
import FloatingConfirmButtons from './FloatingConfirmButtons';

const FloatingActions = ({ editing, switchMode, cancelChanges, saveChanges, isValid }) => (
  <div className="floating-actions">
    <ReactCSSTransitionGroup
      transitionName="test"
      transitionEnterTimeout={300}
      transitionLeaveTimeout={300}
    >
      {editing ?
        <FloatingConfirmButtons
          key="fab_0"
          cancelChanges={cancelChanges}
          saveChanges={saveChanges}
          isValid={isValid}
        /> :
        <FloatingEditButton switchMode={switchMode} key="fab_1" />
      }
    </ReactCSSTransitionGroup>
  </div>
);

export default FloatingActions;
