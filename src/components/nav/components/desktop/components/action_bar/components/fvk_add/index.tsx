import React, { useState } from 'react';
import {
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
  TextField,
} from '@material-ui/core';
import { Close as CloseIcon } from '@material-ui/icons';
import { useStyles } from './styles';

const FvkAdd = () => {
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const [state, setState] = useState(localStorage.getItem('fvk') || '');
  const [isSavedFVK, setIsSavedFVK] = useState(
    // eslint-disable-next-line comma-dangle
    Boolean(localStorage.getItem('fvk'))
  );

  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  const handleFormSubmit = () => {
    localStorage.setItem('fvk', state);
    setIsSavedFVK(Boolean(localStorage.getItem('fvk')));
    setState(localStorage.getItem('fvk'));
  };

  const handleChangeState = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState(e.target.value);
  };

  const handleReset = () => {
    localStorage.removeItem('fvk');
    setIsSavedFVK(false);
    setState('');
  };

  return (
    <div className={classes.container}>
      <Button variant="contained" onClick={handleOpen}>
        ADD FVK
      </Button>
      <Dialog
        maxWidth="md"
        onClose={handleClose}
        open={open}
        className={classes.dialog}
      >
        <DialogTitle disableTypography className={classes.header}>
          <div className={classes.title}>
            <Typography variant="h2">Settings Full Viewing Key</Typography>
          </div>
          <IconButton aria-label="close" onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <form>
            <div className={classes.formItem}>
              <TextField
                label="Full Viewing Key"
                variant="standard"
                value={state}
                onChange={handleChangeState}
                disabled={isSavedFVK}
              />
            </div>
          </form>
        </DialogContent>
        <DialogActions>
          {isSavedFVK ? (
            <Button onClick={handleReset} color="primary">
              Reset
            </Button>
          ) : (
            <Button onClick={handleFormSubmit} color="primary">
              Save
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default FvkAdd;
