import { FormEventHandler, PropsWithChildren, useState } from 'react';
import { Control, Controller } from 'react-hook-form';

import { ExpandMore } from '@src/components/atoms/expand-more';
import { NewUserAddress } from '@src/hooks/addresses';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

type AddressFormProps = PropsWithChildren<{
  control: Control<NewUserAddress>;
  expandable?: boolean;
  initialOpen?: boolean;
  onSubmit: FormEventHandler<HTMLFormElement>;
}>;

export function AdrressForm(props: AddressFormProps) {
  const { children, expandable, initialOpen, control, onSubmit } = props;
  const [expanded, setExpanded] = useState(initialOpen);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  return (
    <Card sx={!expandable && { boxShadow: 'none' }}>
      {expandable && (
        <CardActions disableSpacing>
          <Box>
            <Typography variant="h5">Add new address</Typography>
          </Box>
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
      )}
      <Collapse in={expandable ? expanded : true} timeout="auto" unmountOnExit>
        <Box sx={{ p: 2 }} component="form" onSubmit={onSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Controller
                control={control}
                name="name"
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    label="Name"
                    placeholder="Address name reference, e.g: My House, My Company"
                    fullWidth
                    helperText={fieldState.error?.message ?? ' '}
                    error={Boolean(fieldState.error)}
                  />
                )}
              />
            </Grid>
            <Grid item sm={8} xs={12}>
              <Controller
                control={control}
                name="way"
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    helperText={fieldState.error?.message ?? ' '}
                    error={Boolean(fieldState.error)}
                    label="Way"
                    placeholder="Address way, e.g: Left Street, #20"
                    fullWidth
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Controller
                control={control}
                name="neighborhood"
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    helperText={fieldState.error?.message ?? ' '}
                    error={Boolean(fieldState.error)}
                    label="Neighborhood / borough"
                    placeholder="Address neighborhood e.g: Brooklyn"
                    fullWidth
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                control={control}
                name="city"
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    helperText={fieldState.error?.message ?? ' '}
                    error={Boolean(fieldState.error)}
                    label="City"
                    placeholder="Address city e.g: New York"
                    fullWidth
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                control={control}
                name="province"
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    helperText={fieldState.error?.message ?? ' '}
                    error={Boolean(fieldState.error)}
                    label="State / Province"
                    placeholder="Address province/province e.g: New York city"
                    fullWidth
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                control={control}
                name="country"
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    helperText={fieldState.error?.message ?? ' '}
                    error={Boolean(fieldState.error)}
                    label="Country"
                    placeholder="Address country e.g: USA"
                    fullWidth
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              {children}
            </Grid>
          </Grid>
        </Box>
      </Collapse>
    </Card>
  );
}
