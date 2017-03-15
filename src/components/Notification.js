import React from 'react';

const Notification = ({ msg, type, hideNotification }) => (
  <div className={`notification notification--${type}`}>
    <button className="icon-button notification-button" onClick={hideNotification}>
      <i className="icon-close" />
    </button>
    <p className="notification-message">
      {msg}
    </p>
  </div>
);

export default Notification;
