import React, { useState, forwardRef } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined';
import GridOnOutlinedIcon from '@material-ui/icons/GridOnOutlined';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
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
import NewContributorModal from './NewContributorModal';
import ContributorService from '../../services/Contributor';
import { useEffect } from 'react';

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

const Contributors = observer(() => {
  const [showAddContributor, setShowAddContributor] = useState(false);
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

  function loadMembers() {
    ContributorService.list()
    .then(res => {
      for (let index = 0; index < res.data.length; index++) {
        const element = res.data[index];
        store.addMember({
          id: element.id,
          name: element.name, 
          lastname: element.lastname, 
          address: element.address, 
          email: element.user.email, 
          dni: element.dni, 
          phone: element.phone
        });
      }
    });
  }

  function closeAddContributor() {
    setShowAddContributor(false);
  }

  function openNewContributorModal() {
    setShowAddContributor(true);
  }

  function addMember(member) {
    store.addMember(member);
  }

  useEffect(
    () => {
      loadMembers();
    },
    store.members
  )

  return (
    <section style={{width: '100%'}}>
      <NewContributorModal open={showAddContributor} onClose={closeAddContributor} onAddMember={addMember}/>
      <div className={classes.header}>
        <Typography variant="h5" component="h2">
          Aportantes
        </Typography>
        <Button
          variant="contained"
          color="primary"
          size="large"
          startIcon={<AddIcon />}
          onClick={openNewContributorModal}
        >
          Nuevo Aportante
        </Button>
      </div>
      
      <MaterialTable
          icons={tableIcons}
          columns={[
            { title: 'Nombre', field: 'name' },
            { title: 'Apellido', field: 'lastname' },
            { title: 'DNI', field: 'dni' },
            { title: 'Email', field: 'email' },
            { title: 'Dirección', field: 'address' },
            { title: 'Teléfono', field: 'phone' },
          ]}
          data={store.members}
          title=""
          options={{
            search: true,
            actionsColumnIndex: -1
          }}
          actions={[
            {
              icon: () => {
                return (<IconButton color="primary" aria-label="upload picture" component="span">
                          <SearchIcon />
                        </IconButton>)
              },
              tooltip: '',
              onClick: (event, rowData) => {
                // Do save operation
              }
            },
            {
              icon: () => {
                return (<IconButton color="primary" aria-label="upload picture" component="span">
                          <CreateOutlinedIcon />
                        </IconButton>)
              },
              tooltip: '',
              onClick: (event, rowData) => {
                // Do save operation
              }
            },
            {
              icon: () => {
                return (<IconButton color="primary" aria-label="upload picture" component="span">
                          <GridOnOutlinedIcon />
                        </IconButton>)
              },
              tooltip: '',
              onClick: (event, rowData) => {
                // Do save operation
              }
            },
            {
              icon: () => {
                return (<IconButton color="primary" aria-label="upload picture" component="span">
                          <DeleteOutlineOutlinedIcon />
                        </IconButton>)
              },
              tooltip: '',
              onClick: (event, rowData) => {
                // Do save operation
              }
            }
          ]}
      />
      
    </section>
  );
})

export default Contributors;
