import { MdArrowForward } from 'react-icons/md';

import { NextPageContext } from 'next';
import {
  useSession,
  signOut,
  getProviders,
  signIn,
  ClientSafeProvider,
  getSession,
} from 'next-auth/react';

import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

interface LoginProps {
  providers: { google: ClientSafeProvider };
}

export default function Login(props: LoginProps) {
  const { providers } = props;
  const { status } = useSession();

  return (
    <Paper
      sx={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: `linear-gradient(99deg, #101F33, #003781)`,
        borderRadius: 0,
      }}
      elevation={0}
    >
      <Grid container sx={{ maxWidth: 1000 }}>
        <Grid item xs={12}>
          <Typography gutterBottom variant="h1" sx={{ color: '#fff' }}>
            Welcome to Trash Saver
          </Typography>
          <Typography variant="h3" sx={{ color: '#fff' }}>
            Now you can share you trash with people that will give a right destination for
            it.
          </Typography>
          <Typography gutterBottom variant="h3" sx={{ color: '#fff' }}>
            Let&apos;s start save the world together?
          </Typography>
        </Grid>
        <Grid xs={6} item />
        <Grid xs={6} item>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'center',
            }}
          >
            <Typography sx={{ flex: 1 }}>Ready ?</Typography>
            {status === 'unauthenticated' && (
              <Button onClick={() => signIn(providers.google.id)}>
                Login with Google <MdArrowForward />
              </Button>
            )}
            {status === 'authenticated' && (
              <Button onClick={() => signOut()}>signout</Button>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Paper>
  );
}
export async function getServerSideProps(context: NextPageContext) {
  const { req } = context;
  const session = await getSession({ req });
  if (session) {
    return {
      redirect: { destination: '/', permanent: true },
    };
  }
  return {
    props: {
      providers: await getProviders(),
    },
  };
}
