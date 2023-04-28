import { useTranslation } from "react-i18next";

import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Menu, { MenuProps } from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import Divider from "@mui/material/Divider";
import ArchiveIcon from "@mui/icons-material/Archive";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

function LanguageSelector() {
  const { i18n } = useTranslation();
  const language = i18n.language;

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChangeLanguage = (lan: string) => {
    i18n.changeLanguage(lan);
    window.localStorage.setItem("language", lan);
  };

  return (
    <>
      <IconButton
        onClick={handleClick}
        aria-controls={open ? "account-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        sx={{
          padding: "10px 20px 10px 30px",
          borderRadius: "30px",
          border: "2px solid #E5E5E5",
        }}
      >
        <div className="flex items-center justify-between space-x-4">
          <img src="/Layer 599.png" alt="int" />
          <span>{language === "en" ? "English" : "Français"}</span>
          <KeyboardArrowDownIcon />
        </div>
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        id="lan-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        transformOrigin={{ horizontal: "center", vertical: "top" }}
        anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
        sx={{
          "& .MuiMenu-paper": {
            width: "180px",
            borderRadius: "5px 5px 20px 20px",
            boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.1)",
          },
        }}
      >
        <MenuItem onClick={() => handleChangeLanguage("en")}>
          <Avatar sx={{ width: 32, height: 32 }} src="/eng.png" />{" "}
          <span className="ml-2">English</span>
        </MenuItem>

        <MenuItem onClick={() => handleChangeLanguage("fr")}>
          <Avatar sx={{ width: 32, height: 32 }} src="/Flag-France.webp" />{" "}
          <span className="ml-2">Français</span>
        </MenuItem>
      </Menu>
    </>
  );
}

export default LanguageSelector;
