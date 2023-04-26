import React from "react";
import { useTranslation } from "react-i18next";

const Hero = () => {
  const { t } = useTranslation();

  return (
    <section className="px-4 py-10">
      <div className="max-w-6xl mx-auto">
        <h1 className="pb-10 font-bold text-center text-h2">
          {t("about_header")}
        </h1>

        <div className="max-w-5xl mx-auto text-base font-medium text-center">
          <p>{t("aboutDetails")}</p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
