import Button, { ButtonProps } from '@mui/material/Button';
import CircularProgress, { CircularProgressProps } from '@mui/material/CircularProgress';

export function LoaderButton(
  props: ButtonProps & { ProgressProps?: CircularProgressProps; isLoading?: boolean }
) {
  const { ProgressProps, children, onClick, isLoading, ...others } = props;

  return (
    <Button {...others} onClick={isLoading ? undefined : onClick}>
      {children}
      {isLoading && (
        <CircularProgress
          size={14}
          {...ProgressProps}
          sx={{
            ml: 2,
            color: 'inherit',
            ...ProgressProps?.sx,
          }}
        />
      )}
    </Button>
  );
}
