import { ArrowIcon } from './ArrowIcon';
import { RemoveIcon } from './RemoveIcon';

type Props = {
  expanded: boolean;
  onToggle: (e: React.MouseEvent) => void;
  onRemove: () => void;
};

export const TaskActions = ({ expanded, onToggle, onRemove }: Props) => {
  return (
    <div className='flex items-start gap-2'>
      <button
        type='button'
        onClick={(e) => onToggle(e)}
        className='flex items-center gap-2'
      >
        <ArrowIcon direction={expanded ? 'up' : 'down'} />
      </button>

      <button
        type='button'
        onClick={(e) => {
          e.stopPropagation();
          onRemove();
        }}
        className='rounded-lg bg-red-500 p-1 text-white transition-colors hover:bg-red-300/80 dark:bg-red-800'
      >
        <RemoveIcon className='h-5 w-5' />
      </button>
    </div>
  );
};
