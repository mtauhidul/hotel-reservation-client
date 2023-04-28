import { ReactNode } from "react";

interface Props {
  children?: ReactNode;
}

const Main = ({ children }: Props) => {
  return <div className="flex-1 w-full">{children}</div>;
};

export default Main;
