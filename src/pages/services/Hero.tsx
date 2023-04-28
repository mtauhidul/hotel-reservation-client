import React from "react";
import { useTranslation } from "react-i18next";

const Hero = () => {
  const { t } = useTranslation();

  return (
    <section className="px-4 pt-10 pb-14">
      {/* <h1 className="pb-10 font-bold text-center text-h2">Services</h1> */}

      <ul className="max-w-5xl mx-auto space-y-2 text-base font-medium text-center">
        {[
          "service_one",
          "service_two",
          "service_three",
          "service_four",
          "service_five",
          "service_six",
          "service_seven",
          "service_eight",
        ].map((item: string, index: number) => (
          <li key={index}>
            <p>• {t(item)},</p>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Hero;
