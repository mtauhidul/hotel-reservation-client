import { useTranslation } from 'react-i18next';

const Hero = () => {
  const { t } = useTranslation();

  return (
    <section className='px-4 pt-10 pb-14'>
      <h1 className='pb-10 font-bold text-center text-h2'>{t('areaHeader')}</h1>
    </section>
  );
};

export default Hero;
