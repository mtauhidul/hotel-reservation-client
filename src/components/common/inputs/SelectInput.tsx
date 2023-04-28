import * as React from "react";
import FormControl from "@mui/material/FormControl";
import Typography from "@mui/material/Typography";
import Select from "@mui/material/Select";
import { Controller } from "react-hook-form";

interface SelectInputProps {
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
  children?: React.ReactNode;
}

const SelectInput = ({
  label = "",
  name = "",
  optional = false,
  onChange,
  register,
  errors,
  isRequired = true,
  control,
  ...props
}: SelectInputProps) => {
  return (
    <FormControl
      sx={{
        width: "100%",
        border: "none",
      }}
    >
      <Typography
        align="left"
        variant="subtitle1"
        gutterBottom
        component="label"
        htmlFor={name}
        sx={{
          fontWeight: "400",
          fontSize: "14px",
          lineHeight: "22px",
          color: errors[name] ? "var(--error)" : "var(--brand-color)",
        }}
      >
        {errors[name]?.message ? errors[name]?.message : label}
      </Typography>

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
          <Select
            {...fieldRest}
            sx={{
              border: "none",
            }}
          >
            {props.children}
          </Select>
        )}
      />
    </FormControl>
  );
};

export default SelectInput;
