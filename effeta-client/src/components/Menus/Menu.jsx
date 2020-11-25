import { Button, makeStyles } from '@material-ui/core';
import React from 'react';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
    border: 'solid 1px rgba(0, 0, 0, 0.2)',
    borderRadius: '5px',
    backgroundColor: '#FFFFFF',
    padding: '20px',
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
  inputClass: {
    width: '300px'
  }
}));

const Menu = () => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <section className={classes.root}>
      <Button variant="contained" color="primary" onClick={() => {history.push('/Aportantes')}} size="large">
          Aportantes
      </Button>
      <Button variant="contained" color="primary" onClick={() => {history.push('/Aportes')}} size="large">
          Aportes
      </Button>
    </section>
  );
}

export default Menu;
