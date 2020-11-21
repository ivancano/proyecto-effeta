import React, { useReducer } from 'react';
import { Button, FormControl, MenuItem, Select, TextField } from '@material-ui/core';
import { useEffect } from 'react';
import BasicModal from '../modals/BasicModal';

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
    <BasicModal
      open={open}
      onClose={handleClose}
      title="Modificar Aportante"
    >
      <div className="modal-body">
        <div className="modal-input-container">
          <TextField id="name" label="Nombre" value={state.name} onChange={onInputChange} variant="outlined" className="modal-input" />
          <TextField id="lastname" label="Apellido" value={state.lastname} onChange={onInputChange} variant="outlined" className="modal-input" />
        </div>
        <div className="modal-input-container">
          <TextField id="address" label="Dirección" value={state.address} onChange={onInputChange} variant="outlined" className="modal-input" />
          <TextField id="email" label="Email" value={state.email} onChange={onInputChange} variant="outlined" className="modal-input" />
        </div>
        <div className="modal-input-container">
          <TextField id="phone" label="Teléfono" value={state.phone} onChange={onInputChange} variant="outlined" className="modal-input" />
          <TextField id="dni" label="DNI" value={state.dni} onChange={onInputChange} variant="outlined" className="modal-input" />
        </div>
        <FormControl variant="outlined" className="modal-input-container">
          <Select
            labelId="type-select-label"
            id="type-simple-select"
            value={state.type}
            onChange={onSelection}
            label="Tipo"
            className="modal-input"
            defaultValue={state.type}
          >
            <MenuItem value={1}>Padrino</MenuItem>
            <MenuItem value={2}>Alumno</MenuItem>
            <MenuItem value={3}>No registrado</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div className="modal-footer">
        <Button variant="contained" color="primary" onClick={modifyMember}>Guardar</Button>
        <Button onClick={onClose}>Cancelar</Button>
      </div>
    </BasicModal>
  );
}

export default ModifyContributorModal;
