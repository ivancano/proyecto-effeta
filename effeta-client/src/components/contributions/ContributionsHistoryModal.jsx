import React from 'react';
import ContributionsHistory from './ContributionsHistory';
import BasicModal from '../modals/BasicModal';
import { Button } from '@material-ui/core';

const ContributionsHistoryModal = ({open, handleClose, contributor}) => {

  return (
    <BasicModal
      open={open}
      onClose={handleClose}
      title={`Aportes - ${contributor.name} ${contributor.lastname}`}
    >
      <div style={{display: 'flex', justifyContent: 'flex-end', padding: '10px'}}>
        <Button variant="contained" color="primary">Agregar Aporte</Button>
      </div>
      <ContributionsHistory contributions={contributor.contributions}/>
    </BasicModal>
  );
}

export default ContributionsHistoryModal;

