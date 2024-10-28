import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const GenericModal = ({ show, handleClose, title, body, footer,size,IsCentered,className,backdrop,dialogClassName }) => {
  return (
    <Modal show={show} onHide={handleClose} size={size} centered={IsCentered} className={className} backdrop={backdrop} dialogClassName={dialogClassName}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{body}</Modal.Body>
      {footer && <Modal.Footer>{footer}</Modal.Footer>}
    </Modal>
  );
};

export default GenericModal;