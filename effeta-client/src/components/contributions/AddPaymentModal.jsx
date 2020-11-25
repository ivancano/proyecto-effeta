import { Button, FormControl, MenuItem, Select, TextField } from '@material-ui/core';
import React, { useState } from 'react';
import BasicModal from '../modals/BasicModal';

const AddPaymentModal = ({open, onClose, contribution, onAdd}) => {
  const [amount, setAmount] = useState(0);
  const [source, setSource] = useState('');

  function addPayment() {
    if (!amount || amount <= 0 || !source) {
      alert("Por Favor complete todos los campos");
    } else {
      onAdd({
        source,
        amount,
        contribution
      });
    }
  }

  return (
    <BasicModal
      open={open}
      onClose={onClose}
      title="Agregar pago"
    >
      <section className="modal-body">
        <div className="modal-input-container">
          <TextField id="source" label="Origen" value={source} variant="outlined"  className="modal-input"  onChange={(e) => {
            setSource(e.target.value)
          }}/>
          <TextField id="amount" label="Monto" type="number" value={amount} className="modal-input" variant="outlined" onChange={(e) => {
            setAmount(e.target.value)
          }}/>
        </div>
      </section>
      <div className="modal-footer">
        <Button variant="contained" color="primary" onClick={addPayment}>Aceptar</Button>
        <Button onClick={onClose}>Cancelar</Button>
      </div>
    </BasicModal>
  );
}

export default AddPaymentModal;
