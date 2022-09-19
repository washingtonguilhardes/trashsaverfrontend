import { AppShellBase, Header } from '@src/components/organisms/app-shell';
import { AddressesList } from '@src/components/templates/addresses-list';
import { NewAddress } from '@src/components/templates/new-address';
import { useAddressesList } from '@src/hooks/addresses/addresses-list.hook';
import { ProtectedPageProps, protectedRoute } from '@src/utils/protected.utils';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

export default function Addresses(props: ProtectedPageProps) {
  const { userId } = props;
  const { data: addresses = [], isLoading, refetch } = useAddressesList(userId);

  return (
    <AppShellBase
      header={({ handleDrawerToggle }) => (
        <Header pageTitle="My Addresses" onDrawerToggle={handleDrawerToggle} />
      )}
    >
      <Box sx={{ p: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <NewAddress
              initialOpen={!addresses.length}
              userId={userId}
              onCreateAddress={() => refetch()}
            />
          </Grid>
          <Grid item xs={12}>
            <AddressesList
              addresses={addresses}
              isLoading={isLoading}
              onEditAddress={refetch}
              onDeleteAddress={refetch}
            />
          </Grid>
        </Grid>
      </Box>
    </AppShellBase>
  );
}

export const getServerSideProps = protectedRoute();
