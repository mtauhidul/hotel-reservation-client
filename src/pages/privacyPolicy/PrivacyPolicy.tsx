import Layout from "../../layout";
import { getPage } from "../../services";
import { useTranslation } from "react-i18next";
import Hero from "../../components/common/Layout/Hero";
import Skeleton from "../../components/common/Layout/Skeleton";
import useSWR from "swr";

const PrivacyPolicy = () => {
  const { i18n } = useTranslation();
  const language = i18n.language;

  const getPageData = async () => {
    return await getPage("oL8qf0qFYG5XIHyqKev1");
  };

  const {
    data: privacy_policy,
    error,
    isLoading,
  } = useSWR("privacy_policy", getPageData);

  const description =
    language === "en"
      ? privacy_policy?.descriptionEN
      : privacy_policy?.descriptionFR;

  const title =
    language === "en" ? privacy_policy?.titleEN : privacy_policy?.titleFR;

  if (error)
    return <div className="my-6 text-center text-h4">Failed to load</div>;

  return (
    <Layout>
      {isLoading && <Skeleton />}

      {!isLoading && privacy_policy && (
        <Hero
          title={title}
          description={description}
          image={privacy_policy?.image}
        />
      )}
    </Layout>
  );
};

export default PrivacyPolicy;
