import type { ReactNode } from "react";

interface AppLayoutProps {
  children: ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {
  return <div className="min-h-screen bg-slate-900 mx-auto">{children}</div>;
};

export default AppLayout;
