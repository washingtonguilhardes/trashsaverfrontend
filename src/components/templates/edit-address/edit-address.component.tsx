import { useState, useEffect } from 'react';

import { LoaderButton } from '@src/components/atoms/loader-button';
import { AdrressForm } from '@src/components/organisms/address';
import { useAddressForm } from '@src/hooks/addresses';
import { useEditUserAddress } from '@src/hooks/addresses/edit-address.hook';
import { Address } from '@src/types/address.type';
import { notify } from '@src/utils/notify.util';

import EditIcon from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

interface EditAddressProps {
  address?: Address | null;
  onEditAddress(): void;
  onClickCancel?: () => void;
}

export function EditAddress(props: EditAddressProps) {
  const { address, onEditAddress, onClickCancel } = props;

  const { submit, isLoading } = useEditUserAddress(address?.id ?? '', {
    onError(error) {
      const message = error?.response.data?.response?.message ?? 'Unable to edit address';
      notify({
        type: 'error',
        message,
      });
    },
    onSuccess() {
      onEditAddress();
      notify({
        type: 'success',
        message: 'Address was edited with success',
      });
    },
  });

  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const { control, handleSubmit, reset } = useAddressForm();
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (address) {
      setOpen(true);
      reset(address);
    } else {
      setOpen(false);
      reset({
        city: '',
        country: '',
        name: '',
        neighborhood: '',
        province: '',
        way: '',
      });
    }
  }, [address, reset]);

  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={handleClose}
      aria-labelledby={address?.id}
    >
      <DialogTitle id={address?.id}>Edit address {address?.name ?? ''}</DialogTitle>
      <DialogContent>
        <AdrressForm control={control} onSubmit={handleSubmit(submit)}>
          <Button variant="outlined" sx={{ mr: 3 }} onClick={onClickCancel}>
            Cancel
          </Button>
          <LoaderButton
            type="submit"
            variant="contained"
            disabled={isLoading}
            isLoading={isLoading}
          >
            Save
          </LoaderButton>
        </AdrressForm>
      </DialogContent>
    </Dialog>
  );
}
