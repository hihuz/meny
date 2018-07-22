import React from "react";

const ModalContent = ({ confirm, cancel }) => (
  <div className="modal-content">
    <button className="button-icon modal-close" onClick={cancel}>
      <i className="icon-remove" />
    </button>
    <h5>Supprimer cette recette ?</h5>
    <p>
      <em className="danger">Vous ne pourrez pas revenir en arrière !</em>
    </p>
    <div className="modal-actions">
      <button className="modal-button" onClick={confirm}>
        Confirmer
      </button>
      <button className="modal-button" onClick={cancel}>
        Annuler
      </button>
    </div>
  </div>
);

export default ModalContent;
