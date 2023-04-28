import Layout from "../../layout";

import { getPage } from "../../services";
import { useTranslation } from "react-i18next";
import Hero from "../../components/common/Layout/Hero";
import Skeleton from "../../components/common/Layout/Skeleton";
import useSWR from "swr";

const About = () => {
  const { i18n } = useTranslation();
  const language = i18n.language;

  const getPageData = async () => {
    return await getPage("oWHsL2XNHPAl4yq21a1q");
  };

  const { data: about, error, isLoading } = useSWR("about", getPageData);

  const description =
    language === "en" ? about?.descriptionEN : about?.descriptionFR;

  const title = language === "en" ? about?.titleEN : about?.titleFR;

  if (error)
    return <div className="my-6 text-center text-h4">Failed to load</div>;

  return (
    <Layout>
      {isLoading && <Skeleton />}

      {!isLoading && about && (
        <Hero title={title} description={description} image={about?.image} />
      )}
    </Layout>
  );
};

export default About;
