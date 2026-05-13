import { ArrowIcon } from './ArrowIcon';
import { RemoveIcon } from './RemoveIcon';

type Props = {
  expanded: boolean;
  onToggle: (e: React.MouseEvent) => void;
  onRemove: () => void;
  className?: string;
};

export const TaskActions = ({ expanded, onToggle, onRemove, className = '' }: Props) => {
  return (
    <div className={`flex items-start gap-2 ${className}`}>
      <button
        type='button'
        onClick={(e) => onToggle(e)}
        className='flex items-center gap-2 sm:pl-10'
      >
        <span className='hidden sm:inline'>{expanded ? 'collapse' : 'expand'}</span>
        <ArrowIcon direction={expanded ? 'up' : 'down'} />
      </button>

      <button
        type='button'
        onClick={(e) => {
          e.stopPropagation();
          onRemove();
        }}
        className='rounded-lg bg-red-800 p-1 text-white transition-colors hover:bg-red-300/80'
      >
        <RemoveIcon className='h-5 w-5' />
      </button>
    </div>
  );
};
