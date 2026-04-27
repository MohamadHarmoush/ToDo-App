import type { ReactNode } from "react";

interface AppHeaderProps {
  title?: string;
}

const AppHeader = ({ title }: AppHeaderProps) => (
  <header className="border-b border-gray-700 bg-gray-800/50 px-4">
    <div className="pb-2">
      <h1 className="text-lg font-bold text-white">{title}</h1>
    </div>
  </header>
);

const Content = ({ children }: { children: ReactNode }) => (
  <main className="px-4 py-6 bg-gray-900">{children}</main>
);

const AppLayout = ({ children }: { children: ReactNode }) => (
  <div className="max-w-lg mx-auto mt-2">{children}</div>
);

AppLayout.AppHeader = AppHeader;
AppLayout.Content = Content;

export default AppLayout;
