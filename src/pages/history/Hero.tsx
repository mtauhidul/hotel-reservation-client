import React from "react";
import { useTranslation } from "react-i18next";

const Hero = () => {
  const { t } = useTranslation();

  return (
    <section className="px-4 py-10">
      <div className="max-w-6xl mx-auto">
        <h1 className="pb-10 font-bold text-center text-h2">{t("hisTitle")}</h1>
      </div>
      <div
        style={{
          height: "600px",
        }}
      ></div>
    </section>
  );
};

export default Hero;
