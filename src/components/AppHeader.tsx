interface AppHeaderProps {
  title?: string;
}

const AppHeader = ({ title = "Simple Todo" }: AppHeaderProps) => {
  return (
    <div className="p-4">
      <div className="text-xl font-bold text-white">{title}</div>;
      <div className="border-t border-gray-600" />
    </div>
  );
};

export default AppHeader;
