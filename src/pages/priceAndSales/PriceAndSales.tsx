import Layout from "../../layout";
import { getPage } from "../../services";
import { useTranslation } from "react-i18next";
import Hero from "../../components/common/Layout/Hero";
import Skeleton from "../../components/common/Layout/Skeleton";
import useSWR from "swr";

const PriceAndSales = () => {
  const { i18n } = useTranslation();
  const language = i18n.language;

  const getPageData = async () => {
    return await getPage("5ROi6uygBahLpU6pRq7R");
  };

  const {
    data: price_and_sales,
    error,
    isLoading,
  } = useSWR("price_and_sales", getPageData);

  const description =
    language === "en"
      ? price_and_sales?.descriptionEN
      : price_and_sales?.descriptionFR;

  const title =
    language === "en" ? price_and_sales?.titleEN : price_and_sales?.titleFR;

  if (error)
    return <div className="my-6 text-center text-h4">Failed to load</div>;

  return (
    <Layout>
      {isLoading && <Skeleton />}

      {!isLoading && price_and_sales && (
        <Hero
          title={title}
          description={description}
          image={price_and_sales?.image}
        />
      )}
    </Layout>
  );
};

export default PriceAndSales;
