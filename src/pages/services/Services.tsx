import Layout from "../../layout";
import { getPage } from "../../services";
import { useTranslation } from "react-i18next";
import Hero from "../../components/common/Layout/Hero";
import Skeleton from "../../components/common/Layout/Skeleton";
import useSWR from "swr";

import ServiceHero from "./Hero";

const Services = () => {
  const { i18n } = useTranslation();
  const language = i18n.language;

  const getPageData = async () => {
    return await getPage("bkfoiUCTb6JcnIG3NO72");
  };

  const { data: services, error, isLoading } = useSWR("services", getPageData);

  const description =
    language === "en" ? services?.descriptionEN : services?.descriptionFR;

  const title = language === "en" ? services?.titleEN : services?.titleFR;

  if (error)
    return <div className="my-6 text-center text-h4">Failed to load</div>;

  return (
    <Layout>
      {isLoading && <Skeleton />}

      {!isLoading && services && (
        <Hero title={title} description={description} image={services?.image} />
      )}

      {/* <ServiceHero /> */}
    </Layout>
  );
};

export default Services;
