import React, { useEffect, useState } from 'react';
import MaterialTable from 'material-table';
import { tableIcons } from '../../model/constants';
import Base from "../../services/Base";
import { IconButton } from '@material-ui/core';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import PaymentIcon from '@material-ui/icons/Payment';
import contributorTypes from '../contributors/ContributorTypes';
import contributionStatus from '../contributions/ContributionStatus';
import AddPaymentModal from './AddPaymentModal';
import PaymentService from '../../services/Payment';

const ContributionsHistory = ({contributions, isLoading}) => {
  const [parsedContributors, setParsedContributors] = useState(contributions);
  const [contributionSelected, setContributionSelected] = useState(null);
  const [openAdd, setOpenAdd] = useState(false);

  function openAddModal() {
    setOpenAdd(true);
  }

  function closeAddModal() {
    setOpenAdd(false);
  }

  async function onAdd({source, amount, contribution}) {
    await PaymentService.store({
      contribution_id: contribution.id,
      source,
      amount
    });
    setContributionSelected(null);
    closeAddModal();
  }

  useEffect(() => {
    function mapElements() {
      setParsedContributors(contributions.map(contribution => ({...contribution, type: contributorTypes[contribution.type], status: contributionStatus[contribution.status]})));
    }
    mapElements();
  }, [contributions]);

  return (
    <>
    <MaterialTable
      icons={tableIcons}
      isLoading={isLoading}
      options={{
        search: true,
        actionsColumnIndex: -1
      }}
      title=""
      columns={[
        { title: 'Monto', field: 'amount' },
        { title: 'Fecha vencimiento', field: 'due_date' },
        { title: 'Fecha Creacion', field:'created_at' },
        { title: 'Tipo', field: 'type' },
        { title: 'Estado', field: 'status' }
      ]}
      data={parsedContributors}
      actions={[
        {
          icon: () => {
            return (<IconButton color="primary" aria-label="upload picture" component="span">
                      <AttachMoneyIcon />
                    </IconButton>)
          },
          tooltip: '',
          onClick: (event, rowData) => {
            setContributionSelected(rowData);
            openAddModal();
          }
        }, 
        {
          icon: () => {
            return (<IconButton color="primary" aria-label="upload picture" component="span">
                      <PaymentIcon />
                    </IconButton>)
          },
          tooltip: '',
          onClick: (event, rowData) => {
            const callbackLocation = encodeURIComponent(window.location.href);
            console.log(callbackLocation)
            window.location.href = Base.url + 'contributions/' + rowData.id + '/' + rowData.contributor_id +'/pay-contribution/' + callbackLocation;
          }
        }
      ]}
    />
    <AddPaymentModal open={openAdd} onClose={closeAddModal} onAdd={onAdd} contribution={contributionSelected}/>
    </>
  );
}

export default ContributionsHistory;
