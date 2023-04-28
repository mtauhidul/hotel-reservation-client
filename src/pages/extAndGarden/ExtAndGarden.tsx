import Layout from "../../layout";
import { getPage } from "../../services";
import { useTranslation } from "react-i18next";
import Hero from "../../components/common/Layout/Hero";
import Skeleton from "../../components/common/Layout/Skeleton";
import useSWR from "swr";

const ExtAndGarden = () => {
  const { i18n } = useTranslation();
  const language = i18n.language;

  const getPageData = async () => {
    return await getPage("8bGUw9GddBKZjHx2tUOH");
  };

  const {
    data: ext_and_garden,
    error,
    isLoading,
  } = useSWR("ext_and_garden", getPageData);

  const description =
    language === "en"
      ? ext_and_garden?.descriptionEN
      : ext_and_garden?.descriptionFR;

  const title =
    language === "en" ? ext_and_garden?.titleEN : ext_and_garden?.titleFR;

  if (error)
    return <div className="my-6 text-center text-h4">Failed to load</div>;

  return (
    <Layout>
      {isLoading && <Skeleton />}

      {!isLoading && ext_and_garden && (
        <Hero
          title={title}
          description={description}
          image={ext_and_garden?.image}
        />
      )}
    </Layout>
  );
};

export default ExtAndGarden;
