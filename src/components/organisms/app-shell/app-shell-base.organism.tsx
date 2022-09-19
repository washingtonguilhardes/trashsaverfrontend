import * as React from 'react';

import { Redirect } from '@src/components/atoms/redirect';
import { useSession } from 'next-auth/react';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';

import { Registration } from '../registration';
import { Navigator } from './navigator.organism';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="/">
        Trash Saver
      </Link>{' '}
      {new Date().getFullYear()}.
    </Typography>
  );
}

const drawerWidth = 256;

interface Props {
  containerWidth?: string;
  header?: (params: {
    handleDrawerToggle: () => void;
  }) => React.ReactNode | null | undefined;
}

export function AppShellBase(props: React.PropsWithChildren<Props>) {
  const { status, data } = useSession();
  const { header, containerWidth, children } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const theme = useTheme();
  const isSmUp = useMediaQuery(theme.breakpoints.up('sm'));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  return (
    <>
      <Box sx={{ display: 'flex', minHeight: '100vh' }}>
        {status === 'authenticated' && (
          <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}>
            {isSmUp ? null : (
              <Navigator
                PaperProps={{ style: { width: drawerWidth } }}
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
              />
            )}
            <Navigator
              PaperProps={{ style: { width: drawerWidth } }}
              sx={{ display: { sm: 'block', xs: 'none' } }}
            />
          </Box>
        )}
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          {header ? header({ handleDrawerToggle }) : null}
          <Box
            component="main"
            sx={{ flex: 1, bgcolor: '#eaeff1', maxWidth: containerWidth }}
          >
            {status === 'authenticated' && data.userRoles.length > 0 ? children : ''}
            {status === 'authenticated' && !data.userRoles.length ? <Registration /> : ''}
          </Box>
          <Box component="footer" sx={{ p: 2, bgcolor: '#eaeff1' }}>
            <Copyright />
          </Box>
        </Box>
      </Box>
      {status === 'unauthenticated' && <Redirect to={`/login`} />}
    </>
  );
}
