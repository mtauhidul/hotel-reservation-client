import Layout from "../../layout";

import { getPage } from "../../services";
import { useTranslation } from "react-i18next";
import Hero from "../../components/common/Layout/Hero";
import Skeleton from "../../components/common/Layout/Skeleton";
import useSWR from "swr";

const Events = () => {
  const { i18n } = useTranslation();
  const language = i18n.language;

  const getPageData = async () => {
    return await getPage("H4pNoEMV5MaeZDFZVZka");
  };

  const { data: events, error, isLoading } = useSWR("events", getPageData);

  const description =
    language === "en" ? events?.descriptionEN : events?.descriptionFR;

  const title = language === "en" ? events?.titleEN : events?.titleFR;

  if (error)
    return <div className="my-6 text-center text-h4">Failed to load</div>;

  return (
    <Layout>
      {isLoading && <Skeleton />}

      {!isLoading && events && (
        <Hero title={title} description={description} image={events?.image} />
      )}
    </Layout>
  );
};

export default Events;
