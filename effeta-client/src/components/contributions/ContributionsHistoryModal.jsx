import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ContributionsHistory from './ContributionsHistory';
import { Modal } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    width: '80%',
    minWidth: '320px',
    maxWidth: '1000px',
    backgroundColor: 'white'
  },
  header: {
    padding: '15px',
    borderBottom: 'solid 1px rgba(0, 0, 0, 0.2)'
  },
}));

const ContributionsHistoryModal = ({open, handleClose, contributor}) => {

  const classes = useStyles();

  return (
    <Modal
      open={open}
      onClose={handleClose}
      className={classes.root}
    >
      <section className={classes.container}>
        <Typography variant="h6" className={classes.header}>
          Aportes - {`${contributor.name} ${contributor.lastname}`}
        </Typography>
        <ContributionsHistory contributions={contributor.contributions}/>
      </section>

    </Modal>
  );
}

export default ContributionsHistoryModal;

