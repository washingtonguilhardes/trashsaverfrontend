import { useState } from 'react';
import { Controller } from 'react-hook-form';
import { BsFillPatchCheckFill } from 'react-icons/bs';

import { LoaderButton } from '@src/components/atoms/loader-button';
import { useRegistration, useRegistrationForm } from '@src/hooks/registration';
import { UserRole } from '@src/types/user.type';
import { notify } from '@src/utils/notify.util';
import { useSession } from 'next-auth/react';

import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Typography from '@mui/material/Typography';

export function Registration() {
  const { data } = useSession();
  const { control, handleSubmit } = useRegistrationForm();
  const [success, setSuccess] = useState(false);
  const { submit, isLoading } = useRegistration(data.userId, {
    onError() {
      notify({ message: 'Unable to register your selected option', type: 'error' });
    },
    onSuccess() {
      setSuccess(true);
    },
  });

  return (
    <Box sx={{ p: 2 }}>
      <Paper
        component="form"
        onSubmit={handleSubmit(({ roles }) => submit(roles))}
        sx={{ p: 2, maxWidth: 600, margin: '0 auto' }}
      >
        <Grid container spacing={3}>
          {!success && (
            <>
              <Grid item>
                <Typography variant="h4">
                  {data.user.name}, let us know what is your will?
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="roles"
                  control={control}
                  render={({ field, fieldState }) => (
                    <FormControl disabled={isLoading} error={Boolean(fieldState.error)}>
                      <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        onChange={event => {
                          console.log({ field });
                          field.onChange(
                            (event.target as HTMLInputElement).value.split(',')
                          );
                        }}
                        name="radio-buttons-group"
                        value={field.value.join()}
                      >
                        <FormControlLabel
                          value={UserRole.SHARER}
                          control={<Radio />}
                          label="I want to share my trash"
                        />
                        <FormControlLabel
                          value={UserRole.COLLECTOR}
                          control={<Radio />}
                          label="I want to collect my teammates' garbage "
                        />
                        <FormControlLabel
                          value={`${UserRole.COLLECTOR},${UserRole.SHARER}`}
                          control={<Radio />}
                          label="I want to collect the garbage and share my own garbage"
                        />
                      </RadioGroup>
                      <FormHelperText>
                        {fieldState.error
                          ? fieldState.error.message
                          : 'Please, select one'}
                      </FormHelperText>
                    </FormControl>
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <LoaderButton isLoading={isLoading} variant="contained" type="submit">
                  NEXT
                </LoaderButton>
              </Grid>
            </>
          )}
          {success && (
            <Grid item xs={12}>
              <Grid container spacing={2}>
                <Grid
                  item
                  xs={12}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: 2,
                    color: 'success.main',
                  }}
                >
                  <BsFillPatchCheckFill style={{ color: 'inherit', fontSize: '3rem' }} />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="h4">
                    Thank you so much. Now you can continue using our app.
                  </Typography>
                  <Typography>
                    keep in your mind that you are the only one responsible for making a
                    difference in our World, we are just helping you on your path. You are
                    the hero here
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <LoaderButton
                    onClick={() => {
                      if (typeof window !== 'undefined') {
                        window.location.reload();
                      }
                    }}
                  >
                    Lets go
                  </LoaderButton>
                </Grid>
              </Grid>
            </Grid>
          )}
        </Grid>
      </Paper>
    </Box>
  );
}
