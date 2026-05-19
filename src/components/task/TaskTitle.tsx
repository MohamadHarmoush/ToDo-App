type Props = {
  title: string;
  completed: boolean;
  onClick: () => void;
  className?: string;
};

export const TaskTitle = ({ title, completed, onClick, className = '' }: Props) => {
  const taskTitleClassName = completed ? 'line-through text-gray-400' : '';

  return (
    <h1
      onClick={onClick}
      onKeyDown={(e) => {
        e.preventDefault();
        onClick();
      }}
      className={`cursor-pointer ${taskTitleClassName} ${className}`}
    >
      {title}
    </h1>
  );
};
