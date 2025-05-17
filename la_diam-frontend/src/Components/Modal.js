import React from "react";
import PropTypes from "prop-types";
import { Modal, Button } from "react-bootstrap";

const CustomModal = ({
  show,
  onHide,
  centered = true,
  modalTitle,
  modalMsg,
  closeButton = true,
  closeLabel = "Fechar",
}) => (
  <Modal show={show} onHide={onHide} centered={centered}>
    <Modal.Header closeButton={closeButton}>
      <Modal.Title>{modalTitle}</Modal.Title>
    </Modal.Header>
    <Modal.Body>{modalMsg}</Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={onHide}>
        {closeLabel}
      </Button>
    </Modal.Footer>
  </Modal>
);

CustomModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  centered: PropTypes.bool,
  modalTitle: PropTypes.node,
  modalMsg: PropTypes.node,
  closeButton: PropTypes.bool,
  closeLabel: PropTypes.string,
};

export default CustomModal;
