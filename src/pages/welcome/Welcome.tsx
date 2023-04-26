import { useTranslation } from "react-i18next";
import Layout from "../../layout";
import Search from "../../components/common/Forms/Search";
import Hero from "./Hero";

const Welcome = () => {
  const { t } = useTranslation();

  return (
    <Layout>
      <Search />
      <Hero />
    </Layout>
  );
};

export default Welcome;
