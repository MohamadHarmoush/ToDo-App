type PageHeaderProps = {
  title: string;
  subtitle?: string;
};

const PageHeader = ({ title, subtitle }: PageHeaderProps) => {
  return (
    <div className="mb-8">
      <h1 className="text-4xl">{title}</h1>
      {subtitle && <h2>{subtitle}</h2>}
    </div>
  );
};

export default PageHeader;
