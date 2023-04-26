import { useTranslation } from "react-i18next";
import useSWR from "swr";
import { getMenus } from "../../services";
import { useEffect, useState } from "react";

interface HeroProps {
  title: string;
  description: string;
}

const Hero = ({ title, description }: HeroProps) => {
  const [activeMenu, setActiveMenu] = useState<any>({});
  const { i18n } = useTranslation();
  const language = i18n.language;
  const getRestaurantMenu = async () => {
    return await getMenus();
  };

  const {
    data: menu,
    error: menuError,
    isLoading: menuLoading,
  } = useSWR("menu", getRestaurantMenu);

  const activatedMenu = menu?.find((item) => item?.status);
  useEffect(() => {
    if (activatedMenu?.status) {
      setActiveMenu(activatedMenu);
    }
  }, [activatedMenu?.status]);

  const dessert =
    language === "en" ? activeMenu?.dessertEN : activeMenu?.dessertFR;

  const platter =
    language === "en"
      ? activeMenu?.platPrincipalEN
      : activeMenu?.platPrincipalFR;

  if (menuError)
    return <div className="my-6 text-center text-h4">Failed to load</div>;

  return (
    <section className="px-4 py-10">
      <div className="max-w-6xl mx-auto">
        <h1 className="pb-6 font-bold text-center text-h2">{title}</h1>

        <div className="flex items-center justify-center sm:w-[500px] w-full mx-auto relative">
          <img
            src="/boxs.png"
            // src="/carte tableau.png"
            className="object-contain w-[100%]"
            alt="table"
          />
          <div className="absolute top-0 left-0 flex items-center justify-center w-full h-full">
            <div className="flex flex-col items-center justify-start w-full h-full p-6 sm:p-[50px]">
              <img
                src="/Le Clos Saint-Germain.png"
                alt=""
                style={{
                  height: "60px",
                  width: "auto",
                  objectFit: "contain",
                }}
                className="mt-2 sm:mt-5"
              />
              <i className="mt-1 text-xs text-white sm:text-lg sm:mt-5">Menu</i>
              <h3 className="mt-2 text-xs text-white underline sm:text-2xl sm:mt-5">
                Plat principal
              </h3>

              <p className="mt-2 text-sm text-white sm:text-2xl sm:mt-5">
                {platter}
              </p>

              <h3 className="mt-2 text-xs text-white underline sm:text-2xl sm:mt-5">
                Dessert
              </h3>
              <p className="mt-2 text-sm text-white sm:text-2xl sm:mt-5">
                {dessert}
              </p>
            </div>
          </div>
        </div>

        <div className="pt-8">
          <p className="text-base font-medium text-justify">{description}</p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
