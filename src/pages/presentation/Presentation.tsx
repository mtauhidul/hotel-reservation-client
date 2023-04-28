import Layout from "../../layout";
import { getPage } from "../../services";
import { useTranslation } from "react-i18next";
import Hero from "../../components/common/Layout/Hero";
import Skeleton from "../../components/common/Layout/Skeleton";
import useSWR from "swr";

const Presentation = () => {
  const { i18n } = useTranslation();
  const language = i18n.language;

  const getPageData = async () => {
    return await getPage("TewKKnou89xd8KkF6iqw");
  };

  const {
    data: presentation,
    error,
    isLoading,
  } = useSWR("presentation", getPageData);

  const description =
    language === "en"
      ? presentation?.descriptionEN
      : presentation?.descriptionFR;

  const title =
    language === "en" ? presentation?.titleEN : presentation?.titleFR;

  if (error)
    return <div className="my-6 text-center text-h4">Failed to load</div>;

  return (
    <Layout>
      {isLoading && <Skeleton />}

      {!isLoading && presentation && (
        <Hero
          title={title}
          description={description}
          image={presentation?.image}
        />
      )}
    </Layout>
  );
};

export default Presentation;
