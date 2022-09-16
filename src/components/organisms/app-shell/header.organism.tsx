import * as React from 'react';

import { Logout } from '@src/components/molecules/logout';
import { signOut, useSession } from 'next-auth/react';

import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

interface HeaderProps {
  onDrawerToggle?: () => void;
  primaryAction?: () => React.ReactNode;
  pageTitle?: string;
}

export function Header(props: HeaderProps) {
  const { onDrawerToggle, primaryAction, pageTitle } = props;

  const { data, status } = useSession();

  return (
    <React.Fragment>
      <AppBar color="primary" position="sticky" elevation={0}>
        <Toolbar>
          <Grid container alignItems="center">
            {!primaryAction && (
              <Grid sx={{ display: { sm: 'none', xs: 'block' } }} xs={2} item>
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  onClick={onDrawerToggle}
                  edge="start"
                >
                  <MenuIcon />
                </IconButton>
              </Grid>
            )}
            <Grid item xs={8} sm={10} sx={{ display: 'flex', alignItems: 'center' }}>
              {primaryAction ? primaryAction() : null}
              <Typography
                sx={{
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  '@media (max-width:425px)': {
                    width: 'calc(100vw - 124px)',
                  },
                }}
                color="inherit"
                variant="h5"
                component="h1"
              >
                {pageTitle}
              </Typography>
            </Grid>

            {status === 'authenticated' && (
              <Grid
                item
                xs={2}
                sx={{ display: { sm: 'flex' }, justifyContent: 'flex-end' }}
              >
                <Logout
                  avatar={data.user?.image ?? ''}
                  username={data.user?.name ?? ''}
                  onClickLogout={() => signOut()}
                />
              </Grid>
            )}
          </Grid>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}
