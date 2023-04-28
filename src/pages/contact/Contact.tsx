// import ContactForm from "../../components/common/Forms/Contact";
import Layout from "../../layout";

import { getPage } from "../../services";
import { useTranslation } from "react-i18next";
import Hero from "../../components/common/Layout/Hero";
import Skeleton from "../../components/common/Layout/Skeleton";
import useSWR from "swr";

const Contact = () => {
  const { i18n } = useTranslation();
  const language = i18n.language;

  const getPageData = async () => {
    return await getPage("5gMhZmU3BYbvMnbaJC3Y");
  };

  const { data: contact, error, isLoading } = useSWR("contact", getPageData);

  const description =
    language === "en" ? contact?.descriptionEN : contact?.descriptionFR;

  const title = language === "en" ? contact?.titleEN : contact?.titleFR;

  if (error)
    return <div className="my-6 text-center text-h4">Failed to load</div>;

  const price = 10;

  return (
    <Layout>
      {isLoading && <Skeleton />}

      {!isLoading && contact && (
        <Hero title={title} description={description} image={contact?.image} />
      )}

      {/* <ContactForm /> */}
    </Layout>
  );
};

export default Contact;
