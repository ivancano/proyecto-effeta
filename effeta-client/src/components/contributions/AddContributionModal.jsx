import { Button, FormControl, MenuItem, Select, TextField } from '@material-ui/core';
import React, { useState } from 'react';
import BasicModal from '../modals/BasicModal';

const AddContributionModal = ({open, onClose, contributor, onAdd}) => {
  const [amount, setAmount] = useState(0);
  const [reference, setReference] = useState('');
  const [type, setType] = useState('');
  const [detail, setDetail] = useState('');
  const date = new Date();
  const [dueDate, setDueDate] = useState(`${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`);

  function addContribution() {
    if (!amount || amount <= 0 || !reference || !type || !dueDate) {
      alert("Por Favor complete todos los campos");
    } else {
      onAdd({
          detail,
          amount,
          reference,
          type,
          dueDate
        });
    }
  }

  return (
    <BasicModal
      open={open}
      onClose={onClose}
      title="Agregar aporte"
    >
      <section className="modal-body">
        <div className="modal-input-container">
          <TextField id="name" label="Aportante" value={`${contributor.name} ${contributor.lastname}`} variant="outlined" disabled className="modal-input"/>
          <TextField id="amount" label="Monto" type="number" value={amount} className="modal-input" variant="outlined" onChange={(e) => {
            setAmount(e.target.value)
          }}/>
        </div>
        <div className="modal-input-container">
          <TextField id="reference" label="Referencia" value={reference} variant="outlined" className="modal-input" onChange={(e) => {
            setReference(e.target.value)
          }}/>
          <FormControl variant="outlined"
              className="modal-input">
            <Select
              labelId="type-select-label"
              id="type-simple-select"
              value={type}
              onChange={(e) => {
                setType(e.target.value)
              }}
              defaultValue={contributor.type}
              label="Tipo"
            >
              <MenuItem value={1}>Padrino</MenuItem>
              <MenuItem value={2}>Alumno</MenuItem>
              <MenuItem value={3}>No registrado</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className="modal-input-container" style={{height: '130px'}}>
          <TextField id="detail" label="Detalle" value={detail} variant="outlined" className="modal-input" multiline rows={3} onChange={(e) => {
            setDetail(e.target.value)
          }}/>
          <TextField id="dueDate" label="Vencimiento" value={dueDate} variant="outlined" className="modal-input" type="date" onChange={(e) => {
            setDueDate(e.target.value)
          }}/>
        </div>
      </section>
      <div className="modal-footer">
        <Button variant="contained" color="primary" onClick={addContribution}>Aceptar</Button>
        <Button onClick={onClose}>Cancelar</Button>
      </div>
    </BasicModal>
  );
}

export default AddContributionModal;
