import { Link } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import { navigation } from "./navigations";
import { Navigation } from "@/types/navigation.type";
import IconButton from "@mui/material/IconButton";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";

interface Props {
  toggle: () => void;
  open: boolean;
}

const MobileBar = ({ toggle, open }: Props) => {
  const { t } = useTranslation();

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [open]);

  return (
    <>
      <div
        className={`fixed top-0 left-0 w-full block md:hidden h-full bg-black bg-opacity-50 z-30 ease-in-out duration-300 ${
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={toggle}
      />

      <div
        className={`top-0 md:hidden left-0 w-[60vw] flex flex-col sm:w-[50vw] bg-white text-black fixed h-screen z-40  ease-in-out duration-300 ${
          open ? "translate-x-0 " : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-4 py-1 space-x-4">
          <Link to="/">
            <img
              src="/Le Clos Saint-Germain.png"
              alt="logo"
              className="object-contain w-full h-12"
            />
          </Link>

          <IconButton
            sx={{
              border: "1px solid #E0C07C",
            }}
            onClick={toggle}
          >
            <CloseIcon className="text-2xl font-bold" />
          </IconButton>
        </div>

        <div className="flex flex-col items-start justify-start flex-1 mt-4 overflow-y-auto">
          {navigation.map(({ name, path }: Navigation) => (
            <Link
              to={path}
              key={path}
              className="w-full p-4 hover:bg-tint hover:text-primary"
            >
              {t(name)}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default MobileBar;
