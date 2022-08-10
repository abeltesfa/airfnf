import React from 'react';
import { Modal } from '../../context/Modal';



function ErrorModal({ hideModal, showModal, validationErrors }) {
  return (
    <>
      {showModal && (
        <Modal onClose={hideModal}>
          <div className="modal-container">
            <div className="modal-header">
              <h2>Error</h2>
            </div>
            <div className='modal-container'>
              <ul className="errors">
                {
                  validationErrors.map(error => (
                    <li key={error}>{error}</li>
                  ))
                }
              </ul>
                <div className="modal-btn-container">
                  <button className="modal-button" onClick={hideModal}>Continue</button>
                </div>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}

export default ErrorModal;
