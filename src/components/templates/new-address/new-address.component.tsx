import { LoaderButton } from '@src/components/atoms/loader-button';
import { AdrressForm } from '@src/components/organisms/address';
import { useAddressForm, useNewUserAddress } from '@src/hooks/addresses';
import { notify } from '@src/utils/notify.util';

interface NewAddressProps {
  userId: string;
  initialOpen?: boolean;
  onCreateAddress(): void;
}

export function NewAddress(props: NewAddressProps) {
  const { onCreateAddress, userId, initialOpen } = props;

  const { control, reset, handleSubmit } = useAddressForm();
  const { submit, isLoading } = useNewUserAddress(userId, {
    onSuccess() {
      notify({ message: 'New address was created', type: 'success' });
      reset({
        city: '',
        country: '',
        name: '',
        neighborhood: '',
        province: '',
        way: '',
      });
      onCreateAddress();
    },
    onError(error) {
      const message =
        error?.response.data?.response?.message ?? 'Unable to create address';
      notify({
        type: 'error',
        message,
      });
    },
  });

  return (
    <AdrressForm
      initialOpen={initialOpen}
      expandable
      control={control}
      onSubmit={handleSubmit(submit)}
    >
      <LoaderButton
        type="submit"
        variant="contained"
        disabled={isLoading}
        isLoading={isLoading}
      >
        Save
      </LoaderButton>
    </AdrressForm>
  );
}
