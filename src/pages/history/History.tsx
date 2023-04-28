import Layout from "../../layout";
import { getPage } from "../../services";
import { useTranslation } from "react-i18next";
import Hero from "../../components/common/Layout/Hero";
import Skeleton from "../../components/common/Layout/Skeleton";
import useSWR from "swr";

const History = () => {
  const { i18n } = useTranslation();
  const language = i18n.language;

  const getPageData = async () => {
    return await getPage("KJoxIv6nUelUFZ55Lcak");
  };

  const { data: history, error, isLoading } = useSWR("history", getPageData);

  const description =
    language === "en" ? history?.descriptionEN : history?.descriptionFR;

  const title = language === "en" ? history?.titleEN : history?.titleFR;

  if (error)
    return <div className="my-6 text-center text-h4">Failed to load</div>;

  return (
    <Layout>
      {isLoading && <Skeleton />}

      {!isLoading && history && (
        <Hero title={title} description={description} image={history?.image} />
      )}
    </Layout>
  );
};

export default History;
