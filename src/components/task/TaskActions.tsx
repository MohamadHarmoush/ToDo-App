import { ArrowIcon } from './ArrowIcon';

type Props = {
  expanded: boolean;
  onToggle: (e: React.MouseEvent) => void;
};

export const TaskActions = ({ expanded, onToggle }: Props) => {
  return (
    <div className='flex items-start gap-2'>
      <button type='button' onClick={(e) => onToggle(e)} className='flex items-center gap-2'>
        <ArrowIcon direction={expanded ? 'up' : 'down'} />
      </button>
    </div>
  );
};
