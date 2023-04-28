import Layout from "../../layout";
import { getMenus, getPage } from "../../services";
import { useTranslation } from "react-i18next";
import Skeleton from "../../components/common/Layout/Skeleton";
import useSWR from "swr";

import GuestHero from "./Hero";

const Guest = () => {
  const { i18n } = useTranslation();
  const language = i18n.language;

  const getPageData = async () => {
    return await getPage("RwUxtlFhUdUu6zODZ5si");
  };

  const {
    data: guest_table,
    error,
    isLoading,
  } = useSWR("guest_table", getPageData);

  const description =
    language === "en" ? guest_table?.descriptionEN : guest_table?.descriptionFR;

  const title = language === "en" ? guest_table?.titleEN : guest_table?.titleFR;

  if (error)
    return <div className="my-6 text-center text-h4">Failed to load</div>;

  return (
    <Layout>
      {isLoading && <Skeleton />}

      {!isLoading && guest_table && (
        <GuestHero title={title} description={description} />
      )}
    </Layout>
  );
};

export default Guest;
