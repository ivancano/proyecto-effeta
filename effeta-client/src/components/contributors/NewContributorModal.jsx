import React, { useReducer } from 'react';
import { Button, FormControl, makeStyles, MenuItem, Select, TextField } from '@material-ui/core';
import BasicModal from '../modals/BasicModal';

const useStyles = makeStyles({
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

const NewContributorModal = ({open, onClose, onAddMember}) => {
  const [state, dispatch] = useReducer(reducer, initialState, init);

  function clearState() {
    dispatch({type: 'reset'});
  }

  function onInputChange(e) {
    dispatch({ type: e.target.id, payload: e.target.value });
  }

  function addMember() {
    const { name, lastname, address, email, dni, phone, type } = state;
    onAddMember({name, lastname, address, email, dni, phone, type});
    clearState();
  }

  function onSelection(e) {
    dispatch({type: 'type', payload: e.target.value});
  }

  const classes = useStyles();

  function handleClose() {
    clearState();
    onClose();
  }

  return (
    <BasicModal
      open={open}
      onClose={handleClose}
      title="Nuevo Aportante"
    >
      <div className="modal-body">
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
          >
            <MenuItem value={1}>Padrino</MenuItem>
            <MenuItem value={2}>Alumno</MenuItem>
            <MenuItem value={3}>No registrado</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div className="modal-footer">
        <Button variant="contained" color="primary" onClick={addMember}>Guardar</Button>
        <Button onClick={onClose}>Cancelar</Button>
      </div>
    </BasicModal>
  );
}

export default NewContributorModal;
