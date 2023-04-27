import i18n from 'i18next';
import { useEffect } from 'react';
import { initReactI18next } from 'react-i18next';
import { Route, Routes } from 'react-router-dom';
import AdminRoute from './AdminRoute';
import Admin from './admin/Admin';
import AdminLogin from './admin/AdminLogin';
import Payment from './components/payment/Payment';
import enTranslations from './internationalization/en.json';
import frTranslations from './internationalization/fr.json';
import About from './pages/about/About';
import Areas from './pages/areas/Areas';
import Contact from './pages/contact/Contact';
import Events from './pages/events/Events';
import ExtAndGarden from './pages/extAndGarden/ExtAndGarden';
import Guest from './pages/guest/Guest';
import History from './pages/history/History';
import LegalNotice from './pages/legalNotice/LegalNotice';
import Presentation from './pages/presentation/Presentation';
import PriceAndSales from './pages/priceAndSales/PriceAndSales';
import PrivacyPolicy from './pages/privacyPolicy/PrivacyPolicy';
import Rates from './pages/rates/Rates';
import Room from './pages/room/Room';
import Rooms from './pages/rooms/Rooms';
import Services from './pages/services/Services';
import Thanks from './pages/thanks/Thanks';
import Welcome from './pages/welcome/Welcome';

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: enTranslations },
    fr: { translation: frTranslations },
  },
  lng: 'en',
  fallbackLng: 'en',
});

const App = () => {
  useEffect(() => {
    const language = window.localStorage.getItem('language');
    if (language) {
      i18n.changeLanguage(language);
    } else {
      window.localStorage.setItem('language', 'en');
      i18n.changeLanguage('en');
    }
  }, []);

  return (
    <Routes>
      <Route path='/' element={<Welcome />} />
      <Route path='/' element={<AdminRoute />}>
        <Route path='admin' element={<Admin />} />
      </Route>
      <Route path='/auth' element={<AdminLogin />} />
      <Route path='/about' element={<About />} />
      <Route path='/areas' element={<Areas />} />
      <Route path='/contact' element={<Contact />} />
      <Route path='/events' element={<Events />} />
      <Route path='/guest' element={<Guest />} />
      <Route path='/history' element={<History />} />
      <Route path='/room/:id' element={<Room />} />
      <Route path='/rooms' element={<Rooms />} />
      <Route path='/services' element={<Services />} />
      <Route path='/payment/:id' element={<Payment />} />
      <Route path='/thanks/:id' element={<Thanks />} />
      <Route path='/policy' element={<PrivacyPolicy />} />
      <Route path='/presentation' element={<Presentation />} />
      <Route path='/ext-and-garden' element={<ExtAndGarden />} />
      <Route path='/rates' element={<Rates />} />
      <Route path='/legal-notice' element={<LegalNotice />} />
      <Route path='/price-and-sales' element={<PriceAndSales />} />
    </Routes>
  );
};

export default App;
