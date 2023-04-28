import Layout from "../../layout";
import { getPage } from "../../services";
import Hero from "../../components/common/Layout/Hero";
import Skeleton from "../../components/common/Layout/Skeleton";
import useSWR from "swr";
import { useTranslation } from "react-i18next";

const Areas = () => {
  const { i18n } = useTranslation();
  const language = i18n.language;

  const getPageData = async () => {
    return await getPage("URRDuYmv2UW8RTgDBuUq");
  };

  const { data: area, error, isLoading } = useSWR("common-areas", getPageData);

  const description =
    language === "en" ? area?.descriptionEN : area?.descriptionFR;

  const title = language === "en" ? area?.titleEN : area?.titleFR;

  if (error)
    return <div className="my-6 text-center text-h4">Failed to load</div>;

  return (
    <Layout>
      {isLoading && <Skeleton />}

      {!isLoading && area && (
        <Hero title={title} description={description} image={area?.image} />
      )}
    </Layout>
  );
};

export default Areas;
