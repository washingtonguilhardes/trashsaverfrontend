import * as React from 'react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { LoaderButton } from '../loader-button';

interface ActionPerformDialogProps {
  children(params: { handleClickOpen(): void; handleClickClose(): void });
  onClickConfirm?: () => void;
  onClickDismiss?: () => void;
  isLoading?: boolean;
  confirmText?: string;
  dismissText?: string;
  dialogTitle: string;
  dialogDescription: string;
}

export function ActionPerformDialog(props: ActionPerformDialogProps) {
  const {
    children,
    onClickConfirm,
    confirmText,
    dismissText,
    dialogTitle,
    isLoading,
    dialogDescription,
    onClickDismiss,
  } = props;
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClickClose = (agree?: boolean) => () => {
    if (agree) {
      if (onClickConfirm) onClickConfirm();
    } else {
      if (onClickDismiss) onClickDismiss();
    }

    setOpen(false);
  };

  return (
    <>
      {children({ handleClickOpen, handleClickClose })}
      <Dialog
        open={open}
        onClose={handleClickClose(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{dialogTitle}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {dialogDescription}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClickClose(false)}>{dismissText ?? 'Cancel'}</Button>
          <LoaderButton isLoading={isLoading} onClick={handleClickClose(true)}>
            {confirmText ?? 'Yes'}
          </LoaderButton>
        </DialogActions>
      </Dialog>
    </>
  );
}
