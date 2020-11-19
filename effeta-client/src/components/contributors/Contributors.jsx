import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined';
import GridOnOutlinedIcon from '@material-ui/icons/GridOnOutlined';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import { observer } from 'mobx-react';
import { useUserStore } from '../../context/UserContext';
import NewContributorModal from './NewContributorModal';

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

  function closeAddContributor() {
    setShowAddContributor(false);
  }

  function openNewContributorModal() {
    setShowAddContributor(true);
  }

  function addMember(member) {
    store.addMember(member);
  }

  return (
    <section>
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
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="Tabla de aportantes">
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>Apellido</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Dirección</TableCell>
              <TableCell>Teléfono</TableCell>
              <TableCell align="center">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {store.members.map((member) => (
              <TableRow key={member.email}>
                <TableCell align="left">{member.name}</TableCell>
                <TableCell align="left">{member.lastName}</TableCell>
                <TableCell align="left">{member.email}</TableCell>
                <TableCell align="left">{member.address}</TableCell>
                <TableCell align="left">{member.phone}</TableCell>
                <TableCell align="center">
                <IconButton color="primary" aria-label="upload picture" component="span">
                  <SearchIcon />
                </IconButton>
                <IconButton color="primary" aria-label="upload picture" component="span">
                  <CreateOutlinedIcon />
                </IconButton>
                <IconButton color="primary" aria-label="upload picture" component="span">
                  <GridOnOutlinedIcon />
                </IconButton>
                <IconButton color="primary" aria-label="upload picture" component="span">
                  <DeleteOutlineOutlinedIcon />
                </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </section>
  );
})

export default Contributors;
