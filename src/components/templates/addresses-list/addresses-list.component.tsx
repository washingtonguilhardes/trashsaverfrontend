import { useState } from 'react';

import { ActionPerformDialog } from '@src/components/atoms/action-perform-dialog';
import { EmptyState } from '@src/components/organisms/empty-state';
import { useAddressesList } from '@src/hooks/addresses/addresses-list.hook';
import { useDeleteUserAddress } from '@src/hooks/addresses/delete-address.hook';
import { Address } from '@src/types/address.type';
import { notify, notifypromise } from '@src/utils/notify.util';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import MapIcon from '@mui/icons-material/Map';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';

import { EditAddress } from '../edit-address';

interface AddressesListProps {
  isLoading?: boolean;
  addresses?: Address[];
  onEditAddress?: () => void;
  onDeleteAddress?: () => void;
}

export function AddressesList(props: AddressesListProps) {
  const { addresses = [], isLoading, onEditAddress, onDeleteAddress } = props;

  const [addressToEdit, setAddressToEdit] = useState<Address | null>(null);

  const { isLoading: isDeletLoading, mutateAsync } = useDeleteUserAddress({
    onSuccess() {
      if (onDeleteAddress) onDeleteAddress();
    },
  });

  const onClickDelete = async (address: Address) => {
    notifypromise(() => mutateAsync(address.id), {
      error: 'Unable to delete address',
      pending: 'Deleteing ...',
      success: 'Address was deleted with success',
    });
  };

  return (
    <>
      {!addresses.length && <EmptyState text="You have no registered address" />}
      <EditAddress
        onClickCancel={() => setAddressToEdit(null)}
        address={addressToEdit}
        onEditAddress={() => {
          setAddressToEdit(null);
          if (onEditAddress) onEditAddress();
        }}
      />
      {Boolean(addresses.length) && (
        <Paper>
          <List>
            {isLoading && (
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: 300,
                }}
              >
                <CircularProgress size={40} />
              </Box>
            )}
            {addresses.map(address => (
              <ListItem
                key={address.id}
                secondaryAction={
                  <>
                    <IconButton
                      edge="end"
                      sx={{ mr: 1 }}
                      onClick={() => setAddressToEdit(address)}
                    >
                      <EditIcon />
                    </IconButton>
                    <ActionPerformDialog
                      isLoading={isDeletLoading}
                      confirmText="Delete"
                      dialogTitle="Delete Address"
                      dialogDescription="Do you want delete this address ?"
                      onClickConfirm={() => onClickDelete(address)}
                    >
                      {({ handleClickOpen }) => (
                        <IconButton
                          onClick={handleClickOpen}
                          edge="end"
                          aria-label="delete"
                        >
                          <DeleteIcon />
                        </IconButton>
                      )}
                    </ActionPerformDialog>
                  </>
                }
              >
                <ListItemAvatar>
                  <Avatar>
                    <MapIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={address.name}
                  secondary={`${address.way}, ${address.neighborhood}, ${address.city} - ${address.city} ${address.country}`}
                />
              </ListItem>
            ))}
          </List>
        </Paper>
      )}
    </>
  );
}
