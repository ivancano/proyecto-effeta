import React, { useReducer } from 'react';
import { Button, FormControl, makeStyles, MenuItem, Modal, Select, TextField, Typography } from '@material-ui/core';
import { useEffect } from 'react';

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

let initialState = {
  name: '',
  lastname: '',
  address: '',
  email: '',
  dni: '',
  phone: '',
  type: 1
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
    case 'type':
      return { ...state, type: action.payload };
    case 'reset':
      return { ...initialState };
    default:
      throw new Error();
  }
}

const ModifyContributorModal = ({open, onClose, onModifyMember, contributor}) => {

  const [state, dispatch] = useReducer(reducer, initialState, init);

  function clearState() {
    dispatch({type: 'reset'});
  }

  function onInputChange(e) {
    dispatch({ type: e.target.id, payload: e.target.value });
  }

  function modifyMember() {
    const { name, lastname, address, email, dni, phone, type } = state;
    onModifyMember({id: contributor.id, name, lastname, address, email, dni, phone, type});
    clearState();
    onClose();
  }

  function onSelection(e) {
    dispatch({type: 'type', payload: e.target.value});
  }

  const classes = useStyles();

  function handleClose() {
    clearState();
    onClose();
  }

  useEffect(() => {
    dispatch({type: 'name', payload: contributor.name});
    dispatch({type: 'lastname', payload: contributor.lastname});
    dispatch({type: 'address', payload: contributor.address});
    dispatch({type: 'email', payload: contributor.email ? contributor.email : contributor.user?.email});
    dispatch({type: 'dni', payload: contributor.dni});
    dispatch({type: 'phone', payload: contributor.phone});
    dispatch({type: 'type', payload: contributor.type});
  }, [contributor])

  return (
    <Modal
      open={open}
      onClose={handleClose}
      className={classes.root}
    >
      <section className={classes.container}>
        <Typography variant="h5" component="h2" className={classes.header}>
          Modificar Aportante
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
          <FormControl variant="outlined" className={classes.inputsContainer}>
            <Select
              labelId="type-select-label"
              id="type-simple-select"
              value={state.type}
              onChange={onSelection}
              label="Tipo"
              className={classes.input}
              defaultValue={state.type}
            >
              <MenuItem value={1}>Padrino</MenuItem>
              <MenuItem value={2}>Alumno</MenuItem>
              <MenuItem value={3}>No registrado</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className={classes.buttonsContainer}>
          <Button variant="contained" color="primary" onClick={modifyMember}>Guardar</Button>
          <Button onClick={onClose}>Cancelar</Button>
        </div>
      </section>
    </Modal>
  );
}

export default ModifyContributorModal;
