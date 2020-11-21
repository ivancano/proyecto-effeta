import React, { useEffect, useState } from 'react';
import MaterialTable from 'material-table';
import { tableIcons } from '../../model/constants';
import { IconButton } from '@material-ui/core';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import contributorTypes from '../contributors/ContributorTypes';

const ContributionsHistory = ({contributions, isLoading}) => {
  const [parsedContributors, setParsedContributors] = useState(contributions);

  useEffect(() => {
    function mapElements() {
      setParsedContributors(contributions.map(contribution => ({...contribution, type: contributorTypes[contribution.type]})));
    }
    mapElements();
  }, [contributions]);

  return (
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
            console.log(rowData);
          }
        }
      ]}
    />
  );
}

export default ContributionsHistory;
