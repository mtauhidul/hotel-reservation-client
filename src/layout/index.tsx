import { ReactNode, useEffect } from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
// import Contact from "@/pages/contact/Contact";
// import Socials from "@/pages/welcome/Socials";
import Contact from "../components/common/Forms/Contact";
import Socials from "../pages/welcome/Socials";

interface Props {
  children?: ReactNode;
}

const Layout = ({ children }: Props) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex flex-col w-full min-h-screen">
      <Header />
      <Main>{children}</Main>
      {/* <Contact />
      <Socials /> */}
      <Footer />
    </div>
  );
};
export default Layout;
