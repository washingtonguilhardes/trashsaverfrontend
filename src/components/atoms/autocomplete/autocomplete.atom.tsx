import * as React from 'react';
import { useMutation } from 'react-query';

import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';

import MUIAutocomplete, {
  AutocompleteProps as MUIAutocompleteProps,
} from '@mui/material/Autocomplete';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';

interface AutoCompleteProps<Multi extends boolean | undefined>
  extends Omit<
    MUIAutocompleteProps<OptionValue, Multi, false, true>,
    'renderInput' | 'renderOption' | 'getOptionLabel' | 'selected' | 'options'
  > {
  error?: string;
  label: string;
  itemsLoader(params?: unknown): Promise<OptionValue[]>;
  disablePreview?: boolean;
}

export function AutoComplete<Multi extends boolean = false>(
  props: AutoCompleteProps<Multi>
) {
  const {
    itemsLoader,
    label,
    value: propsValue,
    error,
    placeholder,
    disablePreview,
    ...others
  } = props;
  const refetchDebounce = React.useRef(null);
  const {
    data = [],
    isLoading,
    mutate,
  } = useMutation(`autocomplete-search-${itemsLoader.name}`, params =>
    itemsLoader(params)
  );

  const search = value => {
    if (refetchDebounce.current) {
      clearTimeout(refetchDebounce.current);
    }
    refetchDebounce.current = setTimeout(() => {
      if (!value) {
        return mutate();
      }
      mutate(value);
    }, 1000);
  };

  React.useEffect(() => {
    mutate();
  }, [mutate]);

  return (
    <MUIAutocomplete<OptionValue, Multi, false, true>
      {...others}
      options={
        propsValue && !disablePreview
          ? [...data, ...(Array.isArray(propsValue) ? propsValue : [])]
          : data
      }
      value={propsValue}
      loadingText="Buscando..."
      noOptionsText="Sem resultados"
      getOptionLabel={option => option.label}
      isOptionEqualToValue={(item, value) => {
        return item.value === value.value;
      }}
      filterOptions={opt => {
        return opt;
      }}
      onInputChange={(_ev, value) => {
        search(value);
      }}
      loading={isLoading}
      renderInput={params => (
        <TextField
          {...params}
          placeholder={placeholder}
          error={Boolean(error)}
          helperText={error ?? ' '}
          variant="standard"
          focused
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <InputAdornment
                position="end"
                sx={isLoading ? { alignItems: 'flex-end', display: 'flex' } : {}}
              >
                {params.InputProps?.endAdornment}
              </InputAdornment>
            ),
          }}
          label={label}
          margin="normal"
        />
      )}
      renderOption={(props, option, { inputValue }) => {
        const matches = match(option.label, inputValue);
        const parts = parse(option.label, matches);

        return (
          <li {...props}>
            <div>
              {parts.map((part, index) => (
                <span
                  key={index}
                  style={{
                    fontWeight: part.highlight ? 700 : 400,
                  }}
                >
                  {part.text}
                </span>
              ))}
            </div>
          </li>
        );
      }}
    />
  );
}
