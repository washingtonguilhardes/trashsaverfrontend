import React, { PropsWithChildren } from 'react';
import { MdCategory } from 'react-icons/md';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

export function EmptyState(props: PropsWithChildren<{ text?: string }>) {
  const { text } = props;
  return (
    <Paper
      sx={{
        p: 1,
        height: '100%',
        with: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        color: '#ccc',
      }}
    >
      <Box>
        <MdCategory />
      </Box>
      <Typography variant="body2">{text}</Typography>
    </Paper>
  );
}
