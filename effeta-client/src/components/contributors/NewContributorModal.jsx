import React, { useReducer, useState } from 'react';
import { Button, makeStyles, Modal, TextField, Typography } from '@material-ui/core';
import ContributorService from '../../services/Contributor';
import UserService from '../../services/User';

const useStyles = makeStyles({
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
  body: {
    padding: '15px',
    borderBottom: 'solid 1px rgba(0, 0, 0, 0.2)',
    justifyContent: 'space-around',
    alignItems: 'space-between',
    display: 'flex',
    flexWrap: 'wrap'
  },
  buttonsContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    padding: '30px',
  },
  inputsContainer: {
    display: 'flex',
    width: '100%'
  },
  input: {
    height: '40px',
    flex: 1,
    margin: '20px'
  }
});

const initialState = {
  name: '',
  lastname: '',
  address: '',
  email: '',
  dni: '',
  phone: ''
}

function init() {
  return { ...initialState };
}

function reducer(state, action) {
  switch (action.type) {
    case 'name':
      return { ...state, name: action.payload };
    case 'lastname':
      return { ...state, lastname: action.payload };
    case 'address':
      return { ...state, address: action.payload };
    case 'email':
      return { ...state, email: action.payload };
    case 'dni':
      return { ...state, dni: action.payload };
    case 'phone':
      return { ...state, phone: action.payload };
    default:
      throw new Error();
  }
}

const NewContributorModal = ({open, onClose, onAddMember}) => {
  const [state, dispatch] = useReducer(reducer, initialState, init);

  function onInputChange(e) {
    dispatch({ type: e.target.id, payload: e.target.value });
  }

  function addMember() {
    const { name, lastname, address, email, dni, phone } = state;
    UserService.register(email, dni).then(res => {
      ContributorService.store({
        name: name,
        lastname: lastname,
        address: address,
        email: email,
        dni: dni,
        phone: phone,
        userId: res.data.id
      }).then(res => {
        onAddMember({name, lastname, address, email, dni, phone});
        onClose();
      }).catch(err => {
        alert(err);
      });
    }).catch(err => {
      alert(err);
    });
  }

  const classes = useStyles();

  return (
    <Modal
      open={open}
      onClose={onClose}
      className={classes.root}
    >
      <section className={classes.container}>
        <Typography variant="h5" component="h2" className={classes.header}>
          Nuevo Aportante
        </Typography>
        <div className={classes.body}>
          <div className={classes.inputsContainer}>
            <TextField id="name" label="Nombre" value={state.name} onChange={onInputChange} variant="outlined" className={classes.input} />
            <TextField id="lastname" label="Apellido" value={state.lastname} onChange={onInputChange} variant="outlined" className={classes.input} />
          </div>
          <div className={classes.inputsContainer}>
            <TextField id="address" label="Dirección" value={state.address} onChange={onInputChange} variant="outlined" className={classes.input} />
            <TextField id="email" label="Email" value={state.email} onChange={onInputChange} variant="outlined" className={classes.input} />
          </div>
          <div className={classes.inputsContainer}>
            <TextField id="phone" label="Teléfono" value={state.phone} onChange={onInputChange} variant="outlined" className={classes.input} />
            <TextField id="dni" label="DNI" value={state.dni} onChange={onInputChange} variant="outlined" className={classes.input} />
          </div>
        </div>
        <div className={classes.buttonsContainer}>
          <Button variant="contained" color="primary" onClick={addMember}>Guardar</Button>
          <Button onClick={onClose}>Cancelar</Button>
        </div>
      </section>
    </Modal>
  );
}

export default NewContributorModal;
