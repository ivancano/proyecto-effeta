import { Modal, Typography } from '@material-ui/core';
import React from 'react';

const BasicModal = ({ onClose, open, children, title }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      className="modal-root"
    >
      <section className="modal-container">
        <Typography variant="h5" component="h2" className="modal-header">
          {title}
        </Typography>
        {children}
      </section>
    </Modal>
  )
}

export default BasicModal;
