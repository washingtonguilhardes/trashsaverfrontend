import { PropsWithChildren } from 'react';
import { MdArrowBack } from 'react-icons/md';

import Link from 'next/link';

import AppBar from '@mui/material/AppBar';
import Box, { BoxProps } from '@mui/material/Box';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';

export function DefaultView(
  props: PropsWithChildren<{
    backPath?: string;
    containerProps?: BoxProps;
    fullWidth?: boolean;
  }>
) {
  const { backPath, children, containerProps, fullWidth } = props;
  return (
    <>
      <AppBar component="div" position="static" elevation={0} sx={{ zIndex: 0 }}>
        <Toolbar>
          {backPath && (
            <Link href={backPath}>
              <Button variant="text" color="inherit">
                <MdArrowBack />
                Voltar
              </Button>
            </Link>
          )}
        </Toolbar>
      </AppBar>
      <Box
        sx={{
          maxWidth: '1200px',
          m: '0 auto',
          ...(fullWidth && { maxWidth: '100%', width: '100%' }),
        }}
        {...containerProps}
      >
        {children}
      </Box>
    </>
  );
}
