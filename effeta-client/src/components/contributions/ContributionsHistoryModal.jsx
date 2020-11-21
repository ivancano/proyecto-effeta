import React, { useEffect, useState } from 'react';
import ContributionsHistory from './ContributionsHistory';
import BasicModal from '../modals/BasicModal';
import { Button } from '@material-ui/core';
import AddContributionModal from './AddContributionModal';
import ContributorService from '../../services/Contributor';
import ContributionService from '../../services/Contribution';

const ContributionsHistoryModal = ({open, handleClose, contributor}) => {

  const [contributions, setContributions] = useState([]);
  const [openAdd, setOpenAdd] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  async function loadContributions() {
    setIsLoading(true);
    await ContributorService.userContributions(contributor.id).then((res) => {
      setContributions(res.data);
    }).catch(err => alert(err)).finally(() => {
      setIsLoading(false);
    });
  }

  function openAddModal() {
    setOpenAdd(true);
  }

  function closeAddModal() {
    loadContributions();
    setOpenAdd(false);
  }

  async function onAdd({detail, amount, reference, type, dueDate}) {
    await ContributionService.store({
      contributor_id: contributor.id,
      detail,
      amount,
      reference,
      type,
      due_date: dueDate
    });
    closeAddModal();
  }

  useEffect(() => {
    loadContributions();
  }, [contributor]);

  return (
    <BasicModal
      open={open}
      onClose={handleClose}
      title={`Aportes - ${contributor.name} ${contributor.lastname}`}
      isLoading={isLoading}
    >
      <AddContributionModal open={openAdd} onClose={closeAddModal} onAdd={onAdd} contributor={contributor}/>
      <div style={{display: 'flex', justifyContent: 'flex-end', padding: '10px'}}>
        <Button variant="contained" color="primary" onClick={openAddModal}>Agregar Aporte</Button>
      </div>
      <div style={{padding: '15px'}}>
        <ContributionsHistory contributions={contributions}/>
      </div>
    </BasicModal>
  );
}

export default ContributionsHistoryModal;

