import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import * as React from 'react';

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { Controller } from 'react-hook-form';

interface DatePickerInputProps {
  name: string;
  label: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  value?: string;
  error?: string;
  optional?: boolean;
  register?: any;
  errors?: any;
  isRequired?: boolean;
  control?: any;
  disablePast?: boolean;
}

const DatePickerInput: React.FC<DatePickerInputProps> = ({
  label = '',
  name = '',
  optional = false,
  onChange,
  register,
  errors,
  isRequired = true,
  control,
  disablePast,
  ...rest
}) => {
  return (
    <Box>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Typography
          align='left'
          variant='subtitle1'
          gutterBottom
          component='label'
          htmlFor={name}
          sx={{
            fontWeight: '400',
            fontSize: '14px',
            lineHeight: '22px',
            color: errors[name] ? 'var(--error)' : 'var(--brand-color)',
          }}>
          {errors[name]?.message ? errors[name]?.message : label}
        </Typography>

        <Box
          sx={{
            mt: 0.5,
            display: { xs: 'none', lg: 'block' },
          }}>
          <Controller
            name={name}
            control={control}
            rules={{
              required: {
                value: isRequired,
                message: `${label} is required *`,
              },
            }}
            render={({ field: { ref, ...fieldRest } }) => (
              <DesktopDatePicker
                sx={{
                  width: '100%',
                }}
                disablePast={true}
                error={errors[name] ? true : false}
                {...fieldRest}
                {...rest}
              />
            )}
          />
        </Box>

        <Box
          sx={{
            mt: 1,
            display: { xs: 'block', lg: 'none' },
          }}>
          <Controller
            name={name}
            control={control}
            rules={{
              required: {
                value: isRequired,
                message: `${label} is required *`,
              },
            }}
            render={({ field: { ref, ...fieldRest } }) => (
              <MobileDatePicker
                sx={{
                  width: '100%',
                }}
                error={errors[name] ? true : false}
                {...fieldRest}
                {...rest}
              />
            )}
          />
        </Box>
      </LocalizationProvider>
    </Box>
  );
};

export default DatePickerInput;
