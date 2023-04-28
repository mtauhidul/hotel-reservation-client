import { useTranslation } from "react-i18next";
import SocialButton from "../../components/common/buttons/SocialButton";

const Socials = () => {
  const { t } = useTranslation();

  return (
    <section className="pb-10 mb-12">
      <h2 className="mb-4 font-bold text-center text-h3 md:text-h2">
        {t("socialHeader")}
      </h2>

      <div className="grid max-w-6xl grid-cols-3 gap-5 px-4 mx-auto">
        <SocialButton
          src="/airbnb.png"
          title="Airbnb"
          url="https://www.airbnb.com/rooms/44098873"
        />
        <SocialButton
          src="/Gîtes_de_France_(logo).png"
          title="Gite de France"
          url="https://www.airbnb.com/rooms/44098873"
        />
        <SocialButton
          src="/facebook.png"
          title="Facebook"
          url="https://www.airbnb.com/rooms/44098873"
        />
      </div>
    </section>
  );
};

export default Socials;
