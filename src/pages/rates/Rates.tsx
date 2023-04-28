import Layout from "../../layout";
import { getPage } from "../../services";
import { useTranslation } from "react-i18next";
import Hero from "../../components/common/Layout/Hero";
import Skeleton from "../../components/common/Layout/Skeleton";
import useSWR from "swr";

const Rates = () => {
  const { i18n } = useTranslation();
  const language = i18n.language;

  const getPageData = async () => {
    return await getPage("BENUp9oMWn53nlPGZr4j");
  };

  const { data: rates, error, isLoading } = useSWR("rates", getPageData);

  const description =
    language === "en" ? rates?.descriptionEN : rates?.descriptionFR;

  const title = language === "en" ? rates?.titleEN : rates?.titleFR;

  if (error)
    return <div className="my-6 text-center text-h4">Failed to load</div>;

  return (
    <Layout>
      {isLoading && <Skeleton />}

      {!isLoading && rates && (
        <Hero title={title} description={description} image={rates?.image} />
      )}
    </Layout>
  );
};

export default Rates;
