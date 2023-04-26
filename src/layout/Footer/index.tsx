import { Navigation } from "@/types/navigation.type";
import { Link } from "react-router-dom";
import ContactForm from "../../components/common/Forms/Contact";
import Socials from "../../pages/welcome/Socials";
import { leftSideNavigation, rightSideNavigation } from "./navigation";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <>
      <ContactForm />
      <Socials />
      <footer className="pt-8 pb-10 bg-tint">
        <div className="grid w-full max-w-6xl grid-cols-6 gap-4 px-4 mx-auto">
          <div className="order-2 col-span-6 md:col-span-1 md:order-1">
            <h5 className="font-semibold text-black text-h4">
              {t("leftLinksHeader")}
            </h5>

            <ul className="mt-5 space-y-2">
              {leftSideNavigation?.map((navigate: Navigation, i: number) => (
                <li key={i}>
                  <Link
                    to={navigate.path}
                    className="font-medium text-black text-body hover:text-primary"
                  >
                    {t(navigate.name)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="order-1 col-span-6 md:col-span-3 md:order-2">
            <Link to="/" className="w-full h-10 overflow-hidden">
              <img
                src="/Le Clos Saint-Germain.png"
                alt="logo"
                className="object-contain w-full h-10"
              />
            </Link>

            <h5 className="mt-6 font-semibold text-center text-black text-h4">
              {t("footerSub")}
            </h5>
          </div>

          <div className="order-3 col-span-6 pl-0 md:pl-10 md:col-span-2">
            <h5 className="font-semibold text-black text-h4">
              {t("rightLinksHeader")}
            </h5>

            <ul className="mt-5 space-y-2">
              {rightSideNavigation?.map((navigate: Navigation, i: number) => (
                <li key={i}>
                  <Link
                    to={navigate.path}
                    className="font-medium text-left text-black text-body hover:text-primary"
                  >
                    {t(navigate.name)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="mt-4 text-sm font-medium text-center md:text-base">
          Copyright © {new Date().getFullYear()} - Le Clos Saint-Germain
        </p>
      </footer>
    </>
  );
};

export default Footer;
