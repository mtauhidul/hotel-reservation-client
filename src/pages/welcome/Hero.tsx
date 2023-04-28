import React from "react";
import { useTranslation } from "react-i18next";

import { getPage } from "../../services";
import useSWR from "swr";

const Hero = () => {
  const [loadImg, setLoadImg] = React.useState(true);
  const { i18n } = useTranslation();
  const language = i18n.language;

  const getPageData = async () => {
    return await getPage("VmljARnhAIXVC9ysSFRw");
  };

  const { data: welcome, error, isLoading } = useSWR("welcome", getPageData);

  const description =
    language === "en" ? welcome?.descriptionEN : welcome?.descriptionFR;

  const title = language === "en" ? welcome?.titleEN : welcome?.titleFR;

  if (isLoading) {
    return (
      <section className="px-4 pt-10 pb-14">
        <div className="h-10 pb-10 bg-gray-100 animate-pulse" />

        <div className="grid max-w-6xl grid-cols-2 gap-6 mx-auto h-96 place-items-center lg:gap-12">
          <div className="w-full h-full col-span-2 bg-gray-100 lg:col-span-1 animate-pulse" />
          <div className="h-full col-span-2 space-y-2 lg:col-span-1">
            {new Array(6).fill(0).map((_, i) => (
              <p
                className="h-4 my-2 bg-gray-100 rounded-md animate-pulse"
                key={i}
              ></p>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error)
    return <div className="my-6 text-center text-h4">Failed to load</div>;

  return (
    <section className="px-4 pt-10 pb-14">
      <h1 className="pb-10 font-bold text-center text-h2">{title}</h1>

      <div className="grid h-full max-w-6xl grid-cols-2 gap-6 mx-auto place-items-center lg:gap-12">
        <div className="relative col-span-2 lg:col-span-1">
          {welcome?.image && (
            <>
              <img
                src={welcome?.image}
                className="object-cover w-full h-full"
                alt="accuiel"
                onLoad={() => setLoadImg(false)}
              />

              {loadImg && (
                <div className="absolute top-0 left-0 flex w-full h-full mb-4 bg-gray-200 animate-pulse rounded-xl" />
              )}
            </>
          )}
        </div>
        <div className="col-span-2 text-base font-medium lg:col-span-1">
          <p className="leading-loose">{description}</p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
