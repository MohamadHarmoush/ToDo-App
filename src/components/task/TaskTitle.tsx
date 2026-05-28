type Props = {
  title: string;
  completed: boolean;
  onClick?: () => void;
};

export const TaskTitle = ({ title, completed, onClick }: Props) => {
  const taskTitleClassName = completed ? 'line-through text-gray-400' : '';

  return (
    <p
      onClick={onClick}
      onKeyDown={(e) => {
        e.preventDefault();
        onClick?.();
      }}
      className={`cursor-pointer text-sm font-medium ${taskTitleClassName}`}
    >
      {title}
    </p>
  );
};
