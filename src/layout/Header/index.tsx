import * as React from "react";
import LanguageSelector from "../../components/languageSelector/LanguageSelector";
import { Link } from "react-router-dom";
import { Container } from "@mui/material";
import { navigation } from "./navigations";
import { Navigation } from "@/types/navigation.type";
import IconButton from "@mui/material/IconButton";

import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import MobileBar from "./MobileBar";
import { useTranslation } from "react-i18next";

const Header = () => {
  const [open, setOpen] = React.useState(false);
  const { t } = useTranslation();

  const toggle = () => {
    setOpen((prev: boolean) => !prev);
  };

  return (
    <header className="relative py-6 overflow-hidden bg-white">
      <Container maxWidth="lg">
        <div className="flex flex-row items-center justify-between w-full lg:flex-col lg:justify-center">
          <Link to="/" className="w-56 h-12 lg:w-auto">
            <img
              src="/Le Clos Saint-Germain.png"
              alt="logo"
              className="object-contain w-full h-12"
            />
          </Link>

          <div className="lg:hidden">
            <IconButton
              sx={{
                border: "1px solid #E0C07C",
              }}
              onClick={toggle}
            >
              {open ? <CloseIcon /> : <MenuIcon />}
            </IconButton>
          </div>

          <nav className="flex-wrap items-center justify-center hidden w-full mt-4 lg:flex space-x-7">
            {navigation?.map((navigate: Navigation, i: number) => (
              <Link
                to={navigate.path}
                key={i}
                className="font-normal leading-loose text-black text-h4 whitespace-nowrap hover:text-primary"
              >
                {t(navigate.name)}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex justify-center mt-4">
          <LanguageSelector />
        </div>
      </Container>

      <MobileBar toggle={toggle} open={open} />
    </header>
  );
};

export default Header;
