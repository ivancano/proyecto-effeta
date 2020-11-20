import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide } from '@material-ui/core';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


const DeleteContributorDialog = ({open, handleClose, handleConfirm, contributor}) => {

  function onConfirm() {
    handleConfirm(contributor.id);
    handleClose();
  }

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle id="alert-dialog-slide-title">{"¿De verdad desea eliminar el siguiente usuario?"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          { `${contributor.name} ${contributor.lastname} - DNI ${contributor.dni}`}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancelar
        </Button>
        <Button onClick={onConfirm} color="primary">
          Eliminar
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DeleteContributorDialog;
