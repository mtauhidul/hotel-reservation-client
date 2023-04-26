import Layout from "../../layout";
import { getPage } from "../../services";
import { useTranslation } from "react-i18next";
import Hero from "../../components/common/Layout/Hero";
import Skeleton from "../../components/common/Layout/Skeleton";
import useSWR from "swr";

const LegalNotice = () => {
  const { i18n } = useTranslation();
  const language = i18n.language;

  const getPageData = async () => {
    return await getPage("HD2UJ0UICQnCQV7ZFQUI");
  };

  const {
    data: legal_notice,
    error,
    isLoading,
  } = useSWR("legal_notice", getPageData);

  const description =
    language === "en"
      ? legal_notice?.descriptionEN
      : legal_notice?.descriptionFR;

  const title =
    language === "en" ? legal_notice?.titleEN : legal_notice?.titleFR;

  if (error)
    return <div className="my-6 text-center text-h4">Failed to load</div>;

  return (
    <Layout>
      {isLoading && <Skeleton />}

      {!isLoading && legal_notice && (
        <Hero
          title={title}
          description={description}
          image={legal_notice?.image}
        />
      )}
    </Layout>
  );
};

export default LegalNotice;
