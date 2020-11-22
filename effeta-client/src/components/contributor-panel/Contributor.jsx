import React, { useState, forwardRef } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import PaymentIcon from '@material-ui/icons/Payment';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import MaterialTable from 'material-table';

import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

import { observer } from 'mobx-react';
import { useUserStore } from '../../context/UserContext';
import { useEffect } from 'react';
import contributionStatus from '../contributions/ContributionStatus';

const useStyles = makeStyles({
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '20px',
  },
  table: {
    minWidth: 650,
  },
});

const Contributor = observer(() => {
  const classes = useStyles();
  const store = useUserStore();

  const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
  };

  useEffect(() => {
    
  }, []);

  return (
    <section style={{width: '100%'}}>
      <div className={classes.header}>
        <Typography variant="h5" component="h2">
          Aportante: Juan Perez
        </Typography>
      </div>
      
      <MaterialTable
          icons={tableIcons}
          columns={[
            { title: 'Detalle', field: 'detail' },
            { title: 'Fecha de vencimiento', field: 'due_date' },
            { title: 'Monto', field: 'amount' },
            { title: 'Estado', field: 'status' }
          ]}
          data={[
            { id: 1, contributor_id: 49, detail: 'test', due_date: '2020-12-01', amount: 100, status: contributionStatus[0] },
            { id: 1, contributor_id: 49, detail: 'test', due_date: '2020-12-01', amount: 100, status: contributionStatus[0] },
            { id: 1, contributor_id: 49, detail: 'test', due_date: '2020-12-01', amount: 100, status: contributionStatus[0] },
            { id: 1, contributor_id: 49, detail: 'test', due_date: '2020-12-01', amount: 100, status: contributionStatus[0] },
            { id: 1, contributor_id: 49, detail: 'test', due_date: '2020-12-01', amount: 100, status: contributionStatus[0] },
            { id: 1, contributor_id: 49, detail: 'test', due_date: '2020-12-01', amount: 100, status: contributionStatus[0] }
          ]}
          title=""
          options={{
            search: true,
            actionsColumnIndex: -1
          }}
          actions={[
            {
              icon: () => {
                return (<IconButton color="primary" aria-label="upload picture" component="span">
                          <PaymentIcon />
                        </IconButton>)
              },
              tooltip: '',
              onClick: (event, rowData) => {
                window.open('http://localhost:3333/contributions/'+rowData.id+'/pay-contribution');
              }
            }
          ]}
      />
    </section>
  );
})

export default Contributor;
