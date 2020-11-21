import { Button } from '@material-ui/core';
import React from 'react';
import BasicModal from '../modals/BasicModal';
import ContributorDetail from './ContributorDetail';

const ContributorDetailModal = ({open, onClose, contributor}) => {

  return (
    <BasicModal
      open={open}
      onClose={onClose}
      title="Aportante"
    >
      <ContributorDetail contributor={contributor} containerClass="modal-body"/>
      <div className="modal-footer">
        <Button onClick={onClose}>Cerrar</Button>
      </div>
    </BasicModal>
  );
}

export default ContributorDetailModal;
