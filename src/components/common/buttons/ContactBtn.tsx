import * as React from "react";
import Button from "@mui/material/Button";

interface ButtonProps {
  styles?: "sm" | "md" | "lg" | "xl" | "xxl";
  variant?: "outlined" | "contained" | "transparent";
  isRounded?: boolean;
  disabled?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  onClick?: () => void;
  sx?: any;
  children?: React.ReactNode;
}

const ContactBtn = ({
  styles,
  isRounded,
  variant = "outlined",
  disabled = false,
  children,
  ...props
}: ButtonProps) => {
  return (
    <Button
      disabled={disabled}
      {...props}
      sx={{
        textTransform: "none",
        borderRadius: isRounded ? "54px" : "8px",
        ...(() => {
          if (styles === "sm") {
            return { fontSize: "12px", padding: "9px 12px", fontWeight: "600" };
          }
          if (styles === "lg") {
            return {
              fontSize: "16px",
              padding: "10px 18px",
              fontWeight: "700",
            };
          }
          if (styles === "xl") {
            return {
              fontSize: "18px",
              padding: "16px 38px",
              fontWeight: "700",
            };
          }
          if (styles === "xxl") {
            return {
              fontSize: "18px",
              padding: "16px 52px",
              fontWeight: "700",
            };
          }
          return { fontSize: "14px", padding: "10px 16px", fontWeight: "600" };
        })(),

        backgroundColor:
          variant === "contained"
            ? "#E0C07C"
            : variant === "transparent"
            ? "transparent"
            : variant === "outlined"
            ? "#ffffff"
            : "#E0C07C",
        color:
          variant === "contained"
            ? "#ffffff"
            : variant === "transparent"
            ? "#E0C07C"
            : variant === "outlined"
            ? "#E0C07C"
            : "#fff",
        border: variant === "contained" ? "none" : "1px solid #E0C07C",
        whiteSpace: "nowrap",
        ...props.sx,

        "&:hover": {
          backgroundColor: variant === "contained" ? "#E0C07C" : "#ffffff",
          color: variant === "contained" ? "#ffffff" : "#E0C07C",
          border: variant === "contained" ? "none" : "1px solid #E0C07C",
        },
      }}
    >
      {children}
    </Button>
  );
};

export default ContactBtn;
