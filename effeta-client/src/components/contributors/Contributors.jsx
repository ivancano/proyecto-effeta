import React, { useState } from 'react';

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


import { observer } from 'mobx-react';
import { useUserStore } from '../../context/UserContext';
import NewContributorModal from './NewContributorModal';
import ContributorService from '../../services/Contributor';
import { useEffect } from 'react';
import UserService from '../../services/User';
import DeleteContributorDialog from './DeleteContributorDialog';
import ContributionsHistoryModal from '../contributions/ContributionsHistoryModal';
import ModifyContributorModal from './ModifyContributorModal';
import ContributorDetailModal from './ContributorDetailModal';
import { tableIcons } from '../../model/constants';

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
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showContributionsModal, setShowContributionsModal] = useState(false);
  const [showModifyModal, setShowModifyModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedContributor, setSelectedContributor] = useState({});
  const classes = useStyles();
  const store = useUserStore();

  function closeAddContributor() {
    setShowAddContributor(false);
  }

  function openNewContributorModal() {
    setShowAddContributor(true);
  }

  function openDeleteDialog(contributor) {
    setSelectedContributor(contributor);
    setShowDeleteDialog(true);
  }

  function closeDeleteDialog() {
    setShowDeleteDialog(false);
  }

  function openContributionsModal(contributor) {
    setSelectedContributor(contributor);
    setShowContributionsModal(true);
  }

  function closeContributionsModal() {
    setShowContributionsModal(false);
  }

  function openModifyModal(contributor) {
    setSelectedContributor(contributor);
    setShowModifyModal(true);
  }

  function closeModifyModal() {
    setShowModifyModal(false);
  }

  function openDetailModal(contributor) {
    setSelectedContributor(contributor);
    setShowDetailModal(true);
  }

  function closeDetailModal() {
    setShowDetailModal(false);
  }

  function confirmDeleteContributor(contributorId) {
    ContributorService.delete(contributorId)
      .then(() => {
        store.removeMember(contributorId);
      }).catch(err => alert(err));
  }

  function modifyMember({id, name, lastname, address, email, dni, phone, type}) {
    console.log({id, name, lastname, address, email, dni, phone, type})
    ContributorService.update({
      id,
      name,
      lastname,
      address,
      email,
      dni,
      phone,
      type
    }).then(res => {
      store.modifyMember(res.data);
    }).catch(err => {
      alert(err);
    });
  }

  function addMember({name, lastname, address, email, dni, phone, type}) {
    UserService.register(email, dni).then(res => {
      ContributorService.store({
        name,
        lastname,
        address,
        email,
        dni,
        phone,
        type,
        userId: res.data.id
      }).then(res => {
        store.addMember(res.data);
        setShowAddContributor(false);
      }).catch(err => {
        alert(err);
      });
    }).catch(err => {
      alert(err);
    });
  }

  useEffect(() => {
    function loadMembers() {
      ContributorService.list()
      .then(res => {
        store.setMembers(res.data);
      });
    }
    loadMembers()
  }, []);

  return (
    <section style={{width: '100%'}}>
      <NewContributorModal
        open={showAddContributor}
        onClose={closeAddContributor}
        onAddMember={addMember}
      />
      <DeleteContributorDialog
        open={showDeleteDialog}
        contributor={selectedContributor}
        handleClose={closeDeleteDialog}
        handleConfirm={confirmDeleteContributor}
      />
      <ContributionsHistoryModal
        open={showContributionsModal}
        handleClose={closeContributionsModal}
        contributor={selectedContributor}
      />
      <ModifyContributorModal
        open={showModifyModal}
        onClose={closeModifyModal}
        contributor={selectedContributor}
        onModifyMember={modifyMember}
      />
      <ContributorDetailModal
        open={showDetailModal}
        onClose={closeDetailModal}
        contributor={selectedContributor}
      />
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
            { title: 'Email', field: 'user.email' },
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
                openDetailModal(rowData);
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
                openModifyModal(rowData);
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
                openContributionsModal(rowData);
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
                openDeleteDialog(rowData);
              }
            }
          ]}
      />
    </section>
  );
})

export default Contributors;
